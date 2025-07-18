import type { Size } from "../../types";
import { parseSize } from "../../utils";

interface IconProps {
    onClick?: () => void;
    isDarkTheme: boolean;
    lightSrc: string;
    darkSrc: string;
    size: Size;
}

const Icon = ({
    onClick,
    isDarkTheme,
    lightSrc,
    darkSrc,
    size,
}: IconProps) => {
    return (
        <img 
            src={`/icons/${isDarkTheme ? darkSrc : lightSrc}.svg`}
            alt="icon" 
            width={parseSize(size)} 
            height={parseSize(size)} 
            onClick={onClick}
        />
    );
};

export default Icon;