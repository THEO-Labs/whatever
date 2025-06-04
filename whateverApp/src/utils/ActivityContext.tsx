// context/ActivityContext.tsx
import React, {createContext, useContext, useState} from 'react';

type ActivityState = 'rest' | 'active';
type ActivityContextType = {
    activity: ActivityState;
    setActivity: (state: ActivityState) => void;
};

const ActivityContext = createContext<ActivityContextType>({
    activity: 'rest',
    setActivity: () => {
    },
});

export const ActivityProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const [activity, setActivity] = useState<ActivityState>('rest');

    return (
        <ActivityContext.Provider value={{activity, setActivity}}>
            {children}
        </ActivityContext.Provider>
    );
};

export const useActivity = () => useContext(ActivityContext);
