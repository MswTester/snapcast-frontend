import type { Dimensions } from "../../themes/types";
import { parseSize } from "../../utils";

interface IconProps {
    isDarkTheme?: boolean;
    src: string;
    size?: keyof Dimensions;
}

const Icon = ({
    isDarkTheme,
    src,
    size = 'md'
}: IconProps) => {
    return (
        <img 
            src={`${src.replace('.svg', '')}_${isDarkTheme ? 'dark' : 'light'}.svg`} 
            alt="icon" 
            width={parseSize(size)} 
            height={parseSize(size)} 
        />
    );
};

export default Icon;