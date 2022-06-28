import styled from 'styled-components';

interface FlexProps {
	direction: 'column' | 'row';
	align: 'center' | 'end' | 'start';
	justify: 'center' | 'end' | 'start' | 'space-between';
}

export const Flex = styled.div<FlexProps>`
	display: flex;
	direction: ${(props) => props.direction || 'column'};
`;
