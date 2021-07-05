import { EntityMeta } from "./entity-meta";
import { DiagramMeta } from "./diagram-meta";

export interface PackageMeta{
  id: string;
  name: string;
  parent?: PackageMeta;
  packages?: PackageMeta[];
  entityMetas?: EntityMeta[];
  diagramMetas?: DiagramMeta[];
}