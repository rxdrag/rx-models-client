import { TreeItem } from "@material-ui/lab";
import MdiIcon from "components/common/mdi-icon";
import { PackageStore } from "../store/package";
import { ClassNode } from "./class-node";
import { DiagramNode } from "./diagram-node";
import { NodeText } from "./node-text";
import PackageAction from "./package-action";
import { TreeNodeLabel } from "./tree-node-label";

export function PackageNode(props:{
  key?:string,
  packageStore: PackageStore
}){
const {packageStore} = props;

const handleAddPackage = ()=>{

}

const handleAddClass = ()=>{

}

const handleAddDiagram = ()=>{

}

const handleDelete = ()=>{

}

return(
  <TreeItem nodeId= {packageStore.id} label={
    <TreeNodeLabel
      action = {
        <PackageAction 
          canEdit 
          onAddPackage = {handleAddPackage} 
          onAddClass = {handleAddClass}
          onAddDiagram = {handleAddDiagram}
          onDelete = {handleDelete}          
        />
      }
    >
      <MdiIcon iconClass = "mdi-folder-outline" size={18} />
      <NodeText>{packageStore.name}</NodeText>
    </TreeNodeLabel>
  }>
    {
      packageStore.packages.map(aPackage=>{
        return (
          <PackageNode key={aPackage.id} packageStore = {aPackage} />
        )
      })
    }
    {
      packageStore.classes.map(aClass=>{
        return (
          <ClassNode key={aClass.id} classStore = {aClass} />
        )
      })
    }
    {
      packageStore.diagrams.map(diagram=>{
        return (
          <DiagramNode key={diagram.id} diagramStore = {diagram} />
        )
      })
    }
  </TreeItem>
)
}
