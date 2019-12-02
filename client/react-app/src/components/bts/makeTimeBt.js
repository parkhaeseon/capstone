import React from 'react';
import { makeStyles} from '@material-ui/core/styles';
import ToggleButton from '@material-ui/lab/ToggleButton';

const useStyles = makeStyles(theme => ({
  toggles: {
    // marginTop: theme.spacing(1),
    // marginBottom: theme.spacing(1),
    width:'100%',
    marginLeft:'10%',
    marginRight:'10%',
  },
}));

export default function MakeTimeBts(props) {
  const classes = useStyles();
  const [selected, setSelected] = React.useState(false);


  return (
    <div>
    <ToggleButton
      key={props.startTime}
      id = {props.id}
      className={classes.toggles}
      value={props.startTime}
      selected={selected}
      onChange={() => {
        setSelected(!selected);
        
      }}
      align='center'
    >
      {props.wording}
    </ToggleButton>
     
    </div>
  );
}