import styled from "@emotion/styled";
import { applyTypography } from "../util";

const Title = styled.div`
    ${p => applyTypography(p.theme.typography.titleMedium)};
    color: ${p => p.theme.colors.onBackground};
`;

const Author = styled.div`
    ${p => applyTypography(p.theme.typography.bodySmall)};
    color: ${p => p.theme.colors.onSurfaceVariant};
`;

interface ITrackBar {
    title: string;
    creater: string;
    onStop: () => void;
}

const TrackBar = ({ title }: ITrackBar) => {
    return (
        <>
            <Title>{title}</Title>
        </>
    );
}

export default TrackBar;
