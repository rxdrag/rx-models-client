import { makeStyles, Theme, createStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
createStyles({
  labelText: {
    fontWeight: 'inherit',
    flexGrow: 1,
    marginLeft: theme.spacing(1),
  },  

}),
);

export function NodeText(props:{
  children:any,
}){
  const classes = useStyles();

  return(
    <Typography variant="body2" 
      component = 'div'
      className={classes.labelText}
    >
      {props.children}
    </Typography>    
  )
}
