import * as React from 'react';
import { Icon } from "@fluentui/react/lib/Icon";

export const Tabs = () => {
  return (
    <>
      <div className="tab-icon">
        <Icon iconName="Streaming" />
      </div>
      <div className="tab-icon">
        <Icon iconName="Manufacturing" />
      </div>
      <div className="tab-icon tab-icon--active">
        <Icon iconName="Design" />
      </div>
      <div className="tab-icon">
        <Icon iconName="Ringer" />
      </div>
    </>
  );
}
