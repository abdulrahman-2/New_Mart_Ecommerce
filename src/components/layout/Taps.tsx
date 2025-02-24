import { useState, useEffect } from "react";
import { Button, Tabs } from "@chakra-ui/react";
import { LuFolder} from "react-icons/lu";
import CreateProduct from "./CreateProduct";
import DashboardProducts from "./DashboardProducts";
import { MdCreateNewFolder } from "react-icons/md";

const Taps = () => {
  const [activeTab, setActiveTab] = useState(
    localStorage.getItem("activeTab") || "Create Product"
  );

  useEffect(() => {
    localStorage.setItem("activeTab", activeTab);
  }, [activeTab]);

  return (
    <Tabs.Root
      w={{ base: "full", sm: "500px", md: "700px" }}
      value={activeTab}
      onValueChange={(details) => setActiveTab(details.value)}
      variant="plain"
    >
      <Tabs.List
        display={"flex"}
        justifyContent={"center"}
        w={"fit-content"}
        mx={"auto"}
        rounded="l3"
        p="2"
        bg={{ base: "gray.100", _dark: "gray.800" }}
      >
        <Tabs.Trigger value="Create Product">
          <Button px={1} variant="ghost">
            <MdCreateNewFolder />
            Create Product
          </Button>
        </Tabs.Trigger>
        <Tabs.Trigger value="Products">
          <Button px={1} variant="ghost">
            <LuFolder />
            Products
          </Button>
        </Tabs.Trigger>
        <Tabs.Indicator rounded="l2" />
      </Tabs.List>

      <Tabs.Content value="Create Product" my={4} w={"full"}>
        <CreateProduct />
      </Tabs.Content>
      <Tabs.Content value="Products" my={4} w={"full"}>
        <DashboardProducts />
      </Tabs.Content>
    </Tabs.Root>
  );
};

export default Taps;
