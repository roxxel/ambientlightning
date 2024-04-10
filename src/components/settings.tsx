import { Settings2, SettingsIcon } from "lucide-react";
import React, { FC } from "react";

interface IProps extends React.PropsWithChildren {}

const Settings: FC<IProps> = ({ children }) => {
  return (
    <div className="w-[360px] group p-4 h-[72px] hover:h-[auto]  transition-[background-color] rounded-br-[12px] hover:bg-white absolute">
      <SettingsIcon className="bg-white rounded-[6px] w-[32px] h-[32px]" />
      <div className="mt-4 translate-x-[-360px] opacity-0 transition-[opacity] group-hover:translate-x-0 group-hover:opacity-100">
        {children}
      </div>
    </div>
  );
};

export default Settings;
