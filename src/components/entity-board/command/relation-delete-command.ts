import { SelectedNode } from "../store/entity-board-store";
import { RelationStore } from "../store/relation";
import { Command } from "./command";

export class RelationDeleteCommand implements Command{
  constructor(
    private readonly relationStore: RelationStore,
  ){}
  
  excute(): SelectedNode{
    this.relationStore.packageStore?.deleteRelation(this.relationStore.uuid);
    return undefined;
  }
  undo(): SelectedNode{
    this.relationStore.packageStore?.addRelation(this.relationStore);
    return this.relationStore;
  };
}