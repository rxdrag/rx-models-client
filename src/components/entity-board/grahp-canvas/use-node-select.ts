import { useEffect } from "react";
import { useEntityBoardStore } from "../store/helper";
import { Node } from '@antv/x6';

export function useNodeSelect(){
  const modelStore = useEntityBoardStore();
  useEffect(()=>{
    if(modelStore.selectedElement)
    {
      const selectionId = modelStore.selectedElement?.uuid;
      modelStore.graph?.cleanSelection();
      modelStore.graph?.select( modelStore.graph?.getCellById(selectionId));
    }

  },[ modelStore.graph, modelStore.selectedElement])

  const handleNodeSelected = (arg: { node: Node<Node.Properties>; })=>{
    modelStore.selectEntity(arg.node.id);
  }

  const handleNodeUnselected = ()=>{
    if(modelStore.openedDiagram?.getNodeById(modelStore.selectedElement?.uuid||'')){
      modelStore.setSelectedElement(undefined);      
    }
  }

  useEffect(()=>{
    const graph =  modelStore.graph;
    graph?.on('node:click', handleNodeSelected);
    graph?.on('node:selected', handleNodeSelected);
    graph?.on('node:unselected', handleNodeUnselected);
    graph?.on('blank:mouseup', handleNodeUnselected);
    return ()=>{
      graph?.off('node:click', handleNodeSelected);
      graph?.off('node:selected', handleNodeSelected);
      graph?.off('node:unselected', handleNodeUnselected);
      graph?.off('blank:mouseup', handleNodeUnselected);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[modelStore.graph])
}