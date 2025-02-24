import { EmptyState, VStack } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

const Empty = ({
  icon,
  title,
  description,
}: {
  icon: React.ReactElement;
  title: string;
  description?: string;
}) => {
  return (
    <EmptyState.Root size={"lg"}>
      <EmptyState.Content>
        <EmptyState.Indicator>{icon}</EmptyState.Indicator>
        <VStack textAlign="center">
          <EmptyState.Title>{title}</EmptyState.Title>
          <EmptyState.Description>
            <Link to={"/cart"}>{description}</Link>
          </EmptyState.Description>
        </VStack>
      </EmptyState.Content>
    </EmptyState.Root>
  );
};

export default Empty;
