import React, { useState } from 'react';
import { inject, observer } from 'mobx-react';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import Badge from '@material-ui/core/Badge';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { makeStyles } from '@material-ui/core/styles';
import {
  ArchiveOutlined,
  Check,
  Clear,
  HourglassEmptyOutlined,
  Inbox,
  Person,
  PieChart,
  Work,
  LocationCity,
  LocalCafe,
  PauseCircleFilled,
  School,
  Backup
} from '@material-ui/icons';
import { participantStore, uiStore, userStore } from '../../../injectables';
import { collectionType, status, location, viewModes } from '../../../constants';
import { StyledListItem } from '../StyledListItem';
import '../style/NavDrawer.css';

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(2),
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

/**
 * Nav drawer component for list views (participant list & staff list)
 * @param {int} numNew number of new participants for the notification badge
 * @param {function} onParticipantViewChanged handler for changing the participant list view with new filters/
 * sorting
 * @param {function} onStaffViewChanged handler for changing the staff list view with new filters/sorting
 * @param {function} handleDrawerClose drawer open handler for when the drawer hides on narrow views
 */
export const ListViewDrawer = inject(
  'uiStore',
  'participantStore',
  'userStore',
)(
  observer(({ numNew, onParticipantViewChanged, onStaffViewChanged, handleDrawerClose }) => {
    const classes = useStyles();
    const [participantsListExpanded, setParticipantsListExpanded] = useState(false);
    const [newListExpanded, setNewListExpanded] = useState(false);
    const { currentViewMode, setCurrentViewMode } = uiStore;
    const { collection } = participantStore;
    const { currentSignedInUser } = userStore;
    const statuses = [
      { id: status.PENDING, name: 'Pending', icon: <HourglassEmptyOutlined /> },
      { id: status.APPROVED, name: 'Approved', icon: <Check /> },
      { id: status.DECLINED, name: 'Declined', icon: <Clear /> },
      { id: status.HOLD, name: 'Hold', icon: <PauseCircleFilled /> },
      { id: status.ARCHIVED, name: 'Archived', icon: <ArchiveOutlined /> },
    ];
    
    const locations = [
      { id: location.NEB, name: 'New Employment Beginnings', icon: <LocationCity/>},
      { id: location.BEAN, name: 'Bean Around Books', icon: <LocalCafe/>},
      { id: location.MENTOR, name: 'Mentorship and School Districts', icon: <School/>}
    ];

    /**
     * Handler for expanding the list of participant filters
     * @param {Event} event
     */
    const expandParticipantClick = (event) => {
      event.stopPropagation();
      setParticipantsListExpanded(!participantsListExpanded);
    };

    /**
     * Handler for expanding the list of new application filters
     * @param {Event} event 
     */
    const expandNewClick = (event) => {
      event.stopPropagation();
      setNewListExpanded(!newListExpanded);
    }

    /**
     * Handler for clicking on list items in the sidebar
     */
    const handleListItemClick = () => {
      setCurrentViewMode(viewModes.PARTICIPANT_LIST);
      handleDrawerClose();
    };

    return (
      <div>
        <List disablePadding>
          <StyledListItem
            button
            selected={
              currentViewMode === viewModes.PARTICIPANT_LIST &&
              collection === collectionType.PERMANENT
            }
            onClick={() => {
              onParticipantViewChanged(collectionType.PERMANENT, null, null);
              handleListItemClick();
              
            }}
          >
            <ListItemIcon>
              <Person />
            </ListItemIcon>
            <ListItemText primary="Participants" />
            <div className="expandButton" onClick={expandParticipantClick}>
              {participantsListExpanded ? <ExpandLess /> : <ExpandMore />}
            </div>
          </StyledListItem>
          <Collapse in={participantsListExpanded} timeout="auto">
            <List component="div" disablePadding>
              {statuses.map((status) => (
                <StyledListItem
                  button
                  key={status.id}
                  className={classes.nested}
                  onClick={() => {
                    onParticipantViewChanged(collectionType.PERMANENT, status.id, null);
                    handleListItemClick();
                  }}
                >
                  <ListItemIcon>{status.icon}</ListItemIcon>
                  <ListItemText primary={status.name} />
                </StyledListItem>
              ))}
              {locations.map((location)=>(
                <StyledListItem
                  button
                  key = {location.id}
                  className={classes.nested}
                  onClick={()=> {
                    onParticipantViewChanged(collectionType.PERMANENT, null, location.id);
                    handleListItemClick();
                  }}
                >
                  <ListItemIcon>{location.icon}</ListItemIcon>
                  <ListItemText primary={location.name} />
                </StyledListItem>
              ))}
            </List>
          </Collapse>
          <Divider />
          <StyledListItem
            button
            selected={
              currentViewMode === viewModes.PARTICIPANT_LIST && collection === collectionType.NEW
            }
            onClick={() => {
              onParticipantViewChanged(collectionType.NEW, null, null);
              handleListItemClick();
            }}
          >
            <ListItemIcon>
              <Badge badgeContent={numNew} color="error" overlap="circle">
                <Inbox />
              </Badge>
            </ListItemIcon>
            <ListItemText primary="New Applications" />
            <div className="expandButton" onClick={expandNewClick}>
              {newListExpanded ? <ExpandLess /> : <ExpandMore />}
            </div>
          </StyledListItem>
          <Collapse in={newListExpanded} timeout="auto">
            <List component="div" disablePadding>
            {locations.map((location)=>(
                <StyledListItem
                  button
                  key = {location.id}
                  className={classes.nested}
                  onClick={()=> {
                    onParticipantViewChanged(collectionType.NEW, null, location.id);
                    handleListItemClick();
                  }}
                >
                  <ListItemIcon>{location.icon}</ListItemIcon>
                  <ListItemText primary={location.name} />
                </StyledListItem>
              ))}
            </List>
          </Collapse>
          <Divider />
          <StyledListItem
            button
            selected={currentViewMode === viewModes.STATISTICS}
            onClick={() => {
              setCurrentViewMode(viewModes.STATISTICS);
              handleDrawerClose();
            }}
          >
            <ListItemIcon>
              <PieChart />
            </ListItemIcon>
            <ListItemText primary="Statistics" />
          </StyledListItem>
          <Divider />
          {currentSignedInUser.role === 'admin' && (
            <StyledListItem
              button
              selected={currentViewMode === viewModes.STAFF_LIST}
              onClick={() => {
                setCurrentViewMode(viewModes.STAFF_LIST);
                onStaffViewChanged();
                handleDrawerClose();
              }}
            >
              <ListItemIcon>
                <Work />
              </ListItemIcon>
              <ListItemText primary="Staff Management" />
            </StyledListItem>
          )}

          <Divider />
            {currentSignedInUser.role === 'admin' && (
              <StyledListItem
                button
                selected={currentViewMode === viewModes.FILE_BACKUP}
                onClick={() => {
                  // Here we invoke our download function upon the tab being clicked
                  // addFile();
                  setCurrentViewMode(viewModes.FILE_BACKUP);
                  handleDrawerClose();
                }}
              >
                <ListItemIcon>
                  <Backup />
                </ListItemIcon>
                <ListItemText primary="Backup Files" />
              </StyledListItem>
            )}
            <Divider />

          </List>
      </div>
    );
  }),
);

