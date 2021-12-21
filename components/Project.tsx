import React from 'react'
import { View, Text } from 'react-native'
import styled from 'styled-components/native';

export default function Project() {
    return (
        <StyledProject>
            <Text></Text>
        </StyledProject>
    )
}

const StyledProject = styled.View`
    width: 100%;
    height: 300px;
    background-color: #f2f2f2;
    border-radius: 20px;
`;