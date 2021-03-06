import React, { useEffect } from "react";
import { useEntityBoardStore } from "../store/helper";
import { LineAction } from "../store/line-action";
import { Edge, Node } from '@antv/x6';
import { getRelationGraphAttrs } from "./get-relation-graph-attrs";
import { RelationCreateCommand } from "../command/relation-create-command";
import { createId } from "util/creat-id";
import { seedId } from "util/seed-id";
import { RelationStore } from "../store/relation";
import { RelationType } from "../meta/relation-meta";
import { EntityType } from "../meta/entity-meta";

export function useEdgeLineDraw(){
  const modelStore = useEntityBoardStore();

  const handleMouseMove = (e: MouseEvent) => {
    const { clientX, clientY } = e;
    const p = modelStore.graph?.clientToLocal({x: clientX, y: clientY});
    if (modelStore.drawingLine?.tempEdge) {
      modelStore.drawingLine?.tempEdge.setTarget(p as any);
    }
  }

  const addVertex = (p:{x:number,y:number})=>{
    if(modelStore.drawingLine){
      modelStore.drawingLine.tempEdge?.appendVertex(p);
    }
  }


  const handleEdgeMouseUp = (arg: { x:number, y:number, edge:Edge})=>{
    const{edge, x, y} = arg;
    const [targetNode] = modelStore.graph?.getNodesFromPoint(x,y)||[];

    if(!modelStore.openedDiagram){
      return;
    }

    if(modelStore.drawingLine && targetNode && modelStore.drawingLine?.tempEdge){
      const relationId = createId();
      const source = modelStore.getEntityById(modelStore.drawingLine.sourceNodeId);
      const target = modelStore.getEntityById(targetNode.id);
      const isInherit = modelStore.drawingLine.relationType === RelationType.INHERIT;

      if(!source || !target){
        return;
      }

      if(target.entityType === EntityType.ENUM || target.entityType === EntityType.INTERFACE 
        || (!isInherit && target.entityType === EntityType.ABSTRACT) 
        || (isInherit && target.entityType !== EntityType.ABSTRACT)){
        return;
      }


      //不能自身继承
      if(isInherit && source.uuid === target.uuid){
        return;
      }

      //继承不能重复
      for(const relation of modelStore.getRelations()){
        if(relation.targetId === target.uuid && relation.sourceId === source.uuid && isInherit){
          return;
        }
      }

      let ownerId = source.uuid;
      if(modelStore.drawingLine.relationType === RelationType.ONE_TO_MANY){
        ownerId = target.uuid;
      }
      
      const comamnd = new RelationCreateCommand(
        modelStore.openedDiagram,
        new RelationStore({
          uuid: relationId,
          relationType: modelStore.drawingLine.relationType,
          sourceId: source.uuid,
          targetId: target.uuid,
          roleOnSource: isInherit ? undefined : target.name.toLowerCase() + seedId(),
          roleOnTarget: isInherit ? undefined : source.name.toLowerCase() + seedId(),
          ownerId: ownerId,
        }),
        {id:relationId, vertices: modelStore.drawingLine?.tempEdge.getVertices()},
      )
      modelStore.excuteCommand(comamnd);
      modelStore.drawingLine?.tempEdge?.remove();    
      modelStore.setPressRelation(undefined);
      modelStore.setDrawingLine(undefined);
      return;
    }
    if(edge?.id === modelStore.drawingLine?.tempEdge?.id){
      addVertex({x,y});      
    }
  }

  const handleEdgeDbclick =  (arg: { edge:Edge})=>{
    if(arg.edge?.id === modelStore.drawingLine?.tempEdge?.id){
      modelStore.setPressRelation(undefined);
      modelStore.setDrawingLine(undefined);  
      arg.edge.remove();         
    }
  }

  //创建临时线条
  const handleNodeClick = (arg: { e:React.MouseEvent, node: Node<Node.Properties> })=>{
    const{e, node} = arg;
    if(!modelStore.pressedLineType){
      return;
    }
    const p = modelStore.graph?.clientToLocal({x: e.clientX, y: e.clientY});
    const lineAction:LineAction = {
      sourceNodeId: node.id,
      relationType: modelStore.pressedLineType,
      tempEdge: modelStore.graph?.addEdge({
        source: node.id,
        target: p,
        connector: { name: 'rounded' },
        attrs: getRelationGraphAttrs(modelStore.pressedLineType),
      })
    }
    modelStore.setDrawingLine(lineAction);
  }

  useEffect(()=>{
    document.addEventListener('mousemove', handleMouseMove);
    return ()=>{
      document.removeEventListener('mousemove', handleMouseMove);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  useEffect(()=>{
    const graph =  modelStore.graph;

    graph?.on('node:click', handleNodeClick);
    graph?.on('edge:mouseup', handleEdgeMouseUp);
    graph?.on('edge:dblclick', handleEdgeDbclick);
    return ()=>{
      graph?.off('node:click', handleNodeClick);
      graph?.off('edge:mouseup', handleEdgeMouseUp);
      graph?.off('edge:dblclick', handleEdgeDbclick);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[modelStore.graph])
}