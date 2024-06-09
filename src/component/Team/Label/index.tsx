import styled from "@emotion/styled";
import React from "react";
import * as diagnostics_channel from "diagnostics_channel";

const Container = styled.div`
  flex-direction: column;
`;

const Label = styled.div`
  font-weight: bold;
  font-size: 12px;
  margin-right: 250px;
`;

interface Props {
    readonly label: string;
    readonly color: string;
}

export const CustomLabel = ({ label, color }: Props) => {
    return (
        <Container>
            <Label style={{ color: color }}>
                {label}
            </Label>
        </Container>
    );
};