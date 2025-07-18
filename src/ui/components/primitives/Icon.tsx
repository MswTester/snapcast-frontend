import type { Size } from "../../types";
import { parseSize } from "../../utils";

interface IconProps {
    isDarkTheme: boolean;
    lightSrc: string;
    darkSrc: string;
    size: Size;
}

const Icon = ({
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
        />
    );
};

export default Icon;