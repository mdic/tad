/**
 *  Left-most fixed nav bar on application pane
 */

import * as React from "react";
import { StateRef } from "oneref";
import { AppState } from "../AppState";
import { Button, IconName } from "@blueprintjs/core";
import { Activity } from "./defs";
import * as actions from "../actions";

export interface ActivityBarProps {
  activity: Activity;
  showDataSources: boolean;
  stateRef: StateRef<AppState>;
}

export const ActivityBar: React.FC<ActivityBarProps> = ({
  activity,
  showDataSources,
  stateRef,
}) => {
  const handleActivityClick =
    (buttonActivity: Activity) =>
    (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
      if (activity === buttonActivity) {
        actions.setActivity("None", stateRef);
      } else {
        actions.setActivity(buttonActivity, stateRef);
      }
    };

  const activityButton = (
    target: Activity,
    iconName: IconName
  ): JSX.Element => (
    <Button
      icon={iconName}
      minimal={true}
      active={activity === target}
      onClick={handleActivityClick(target)}
    />
  );

  const dataSourceButton = showDataSources
    ? activityButton("DataSource", "database")
    : null;

  return (
    <div className={"activityBar"}>
      {dataSourceButton}
      {/* activityButton("Query", "build") */}
      {activityButton("Pivot", "pivot-table")}
      {/* activityButton("Preferences", "cog") */}
    </div>
  );
};
