"use client";

import {
  PencilSquareIcon,
  PlusIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { classNames, idGenerator, sendTab } from "./utils";

export type Tab = {
  id: string;
  name: string;
  selected: boolean;
  content: string;
};

export default function Home() {
  //? default tab
  const dt = (index: number) =>
    ({
      id: idGenerator(),
      name: `Tab ${index}`,
      selected: false,
      content: "",
    } as Tab);

  //? default tabs
  const defaultTabs = Array.from({ length: 10 }, (_, index) => dt(index));

  const [tabs, setTabs] = useState(defaultTabs);

  useEffect(() => {
    const selectedTab = tabs.find((tab) => tab.selected);
    if (selectedTab) {
      sendTab(selectedTab);
    }
  }, [tabs]);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const incomingText = e.target.value;
    const selectedTab = tabs.find((tab) => tab.selected);
    if (selectedTab) {
      setTabs((prevTabs) =>
        prevTabs.map((tab) =>
          tab.selected ? { ...tab, content: incomingText } : tab
        )
      );
    }
  };

  const handleTabClick = (tab: Tab) => {
    setTabs((prevTabs) =>
      prevTabs.map((t) => ({ ...t, selected: t.name === tab.name }))
    );
  };

  const handleNewTabClick = () => {
    setTabs((prevTabs) => [...prevTabs, dt(prevTabs.length)]);
  };

  return (
    <div className="h-screen p-2">
      {/* blur overlay */}
      {/* <div className="absolute inset-0 backdrop-blur-lg opacity-100 hover:opacity-0 transition-all"></div> */}
      <div className="border-primary border-2 h-full p-2">
        <div className="border-primary border h-full flex flex-col justify-between">
          {/* top bar */}
          <div className="w-full flex">
            <div className="w-full flex justify-between">
              <div className="flex bg-primary/30 overflow-x-scroll font-mono">
                {tabs.map((tab, index) => (
                  <Tab handleTabClick={handleTabClick} tab={tab} key={index} />
                ))}
              </div>

              {/* new tab button */}

              <button
                onClick={handleNewTabClick}
                className="border border-primary m-2 p-2 hover:border-secondary"
              >
                <PlusIcon className="w-8 h-8 text-primary" />
              </button>
            </div>
          </div>
          {/* main content */}
          <div className="border border-primary border-dashed h-full m-2">
            <textarea
              className="w-full h-full bg-transparent border-none p-2 resize-none"
              onChange={handleTextChange}
              value={tabs.find((tab) => tab.selected)?.content}
            ></textarea>
            {/* content */}
          </div>
          {/* main controls */}
          <div className="flex py-2 mx-4 mb-2">
            <PencilSquareIcon className="w-8 h-8 text-primary" />
            <div className="flex-grow border border-primary rounded-full mx-2 bg-primary/30"></div>
            <UserIcon className="w-8 h-8 text-primary" />
          </div>
        </div>
      </div>
    </div>
  );
}

type TabProps = {
  tab: Tab;
  handleTabClick: (tab: Tab) => void;
};

function Tab({ tab, handleTabClick }: TabProps) {
  const { name, selected } = tab;
  return (
    <button
      onClick={() => handleTabClick(tab)}
      className={classNames(
        selected ? "border-secondary" : "border-primary",
        "border m-2 p-2 w-full hover:border-secondary transition-all"
      )}
    >
      {name}
    </button>
  );
}
