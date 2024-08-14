"use client";
import React, { useEffect, useState } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { app } from "../../utils/firebase";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/Table";

import { Avatar } from "@/components/Avatar";
import {
  Sidebar,
  SidebarBody,
  SidebarFooter,
  SidebarItem,
  SidebarLabel,
  SidebarSection,
} from "@/components/Sidebar";
import { ChevronRightIcon } from "@heroicons/react/16/solid";
import {
  Cog6ToothIcon,
  HomeIcon,
  MegaphoneIcon,
  Square2StackIcon,
  TicketIcon,
} from "@heroicons/react/20/solid";

const Page = () => {
  const [state, setState] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const db = getFirestore(app);
      const querySnapshot = await getDocs(collection(db, "Test"));
      let data = [];
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });
      setState(data);
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );

  return (
    <>
      <Sidebar className="w-[250px] hidden lg:block">
        <SidebarBody>
          <SidebarSection>
            <SidebarItem href="/">
              <HomeIcon />
              <SidebarLabel>Home</SidebarLabel>
            </SidebarItem>
            <SidebarItem href="/events">
              <Square2StackIcon />
              <SidebarLabel>Events</SidebarLabel>
            </SidebarItem>
            <SidebarItem href="/orders">
              <TicketIcon />
              <SidebarLabel>Orders</SidebarLabel>
            </SidebarItem>
            <SidebarItem href="/broadcasts">
              <MegaphoneIcon />
              <SidebarLabel>Broadcasts</SidebarLabel>
            </SidebarItem>
            <SidebarItem href="/settings">
              <Cog6ToothIcon />
              <SidebarLabel>Settings</SidebarLabel>
            </SidebarItem>
          </SidebarSection>
        </SidebarBody>
        <SidebarFooter className="absolute bottom-0">
          <SidebarSection className="w-[100%]">
            <SidebarItem>
              <Avatar src="/jonathan.jpg" className="rounded-md" />
              <SidebarLabel>Jonathan</SidebarLabel>
              <ChevronRightIcon />
            </SidebarItem>
          </SidebarSection>
        </SidebarFooter>
      </Sidebar>
      <div className="grow p-6 lg:rounded-lg lg:bg-white lg:p-10 lg:shadow-sm lg:ring-1 lg:ring-zinc-950/5 dark:lg:bg-zinc-900 dark:lg:ring-white/10">
        <div className="container mx-auto px-4 py-6">
          <h2 className="text-2xl font-semibold text-gray-100 mb-4">
            Test Table
          </h2>
          <div className="overflow-x-auto">
            <Table>
              <TableHead>
                <TableRow>
                  <TableHeader>Sr.No</TableHeader>
                  <TableHeader>Name</TableHeader>
                  <TableHeader>Email</TableHeader>
                  <TableHeader>Age</TableHeader>
                </TableRow>
              </TableHead>
              <TableBody>
                {state &&
                  state.map((item, index) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium text-zinc-300">
                        {index + 1}
                      </TableCell>
                      <TableCell className="font-medium text-zinc-300">
                        {item?.firstname} {item?.lastname}
                      </TableCell>
                      <TableCell className="text-zinc-300">
                        {item.email}
                      </TableCell>
                      <TableCell className="text-zinc-300">
                        {item.age}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
