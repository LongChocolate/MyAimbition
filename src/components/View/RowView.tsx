import React from "react";
import { View, Text, ViewProps } from "react-native";

interface RowViewProps extends ViewProps {
  children?: React.ReactNode;
  justifyContent?:
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-between"
    | "space-around"
    | "space-evenly";
}

export const RowView = ({
  children,
  justifyContent,
  ...props
}: RowViewProps) => {
  return (
    <View
      style={[
        { flexDirection: "row", alignItems: "center", justifyContent },
        props.style,
      ]}
    >
      {children}
    </View>
  );
};
