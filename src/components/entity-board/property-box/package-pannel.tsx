import React from 'react';
import { observer } from 'mobx-react';
import { PackageStore } from '../store/package';
import { Grid } from '@material-ui/core';
import intl from "react-intl-universal";
import { useEntityBoardStore } from '../store/helper';
import { NameChangeCommand } from '../command/name-change-command';
import LazyTextField from 'components/entity-board/property-box/lazy-text-field';

export const PackagePanel = observer((
  props:{
    packageStore:PackageStore
  }
)=>{
  const {packageStore} = props;
  const bordStore = useEntityBoardStore();
  const handleNameChange = (value:string)=>{
    const command = new NameChangeCommand(packageStore, value);
    bordStore.excuteCommand(command);
  }

  return(
    <>
      <Grid item xs={12}>
        <LazyTextField 
          label = {intl.get('name')} 
          value = {packageStore.name || ''} 
          onChange={handleNameChange}
        />
      </Grid>
    </>
  )
})