import React, { useState } from "react";
import { IActivity } from "../types/types";
import { activitySortFunction } from "../utils/date";

type ActivityContextType = {
  activities: IActivity[] | [];
  sortAddActivity: (activity: IActivity) => void;
  setActivities: (activities: IActivity[]) => void;
};

type ActivityProviderProps = {
  children: React.ReactNode;
};

const ActivityContext = React.createContext<ActivityContextType>({
  activities: [],
  sortAddActivity: () => [],
  setActivities: () => [],
});

function ActivityProvider({ children }: ActivityProviderProps) {
  const [activities, setActivities] = useState<IActivity[] | []>([]);

  const sortAddActivity = (newActivity: IActivity): IActivity[] => {
    let previousActivities: IActivity[] = activities;
    if (previousActivities.length > 9) {
      previousActivities = previousActivities.sort(activitySortFunction);
      previousActivities.splice(9); // limit activities to last 10
    }
    previousActivities.push(newActivity);
    setActivities(previousActivities);
    return activities;
  };

  return (
    <ActivityContext.Provider
      value={{ activities, sortAddActivity, setActivities }}
    >
      {children}
    </ActivityContext.Provider>
  );
}

export { ActivityProvider, ActivityContext };
