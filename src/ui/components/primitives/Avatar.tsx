import styled from "@emotion/styled";
import type { Size } from "../../types";
import { parseSize } from "../../utils";
import type { Theme } from "../../themes/types";
import { useTheme } from "@emotion/react";

interface AvatarProps {
    src: string;
    size?: Size;
}

const StyledImg = styled.img<AvatarProps & { theme: Theme }>`
    width: ${p => p.size ? parseSize(p.size, p.theme) : 'auto'};
    height: ${p => p.size ? parseSize(p.size, p.theme) : 'auto'};
    border-radius: 50%;
`;

const Avatar = ({ src, size }: AvatarProps) => {
    const theme = useTheme();
    return (
        <StyledImg src={src} alt="avatar" size={size} theme={theme} />
    );
};

export default Avatar;