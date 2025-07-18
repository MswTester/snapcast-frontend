interface IconProps {
    isDarkTheme?: boolean;
    lightIcon: string;
    darkIcon: string;
    size: string;
}

const Icon = ({
    isDarkTheme,
    lightIcon,
    darkIcon,
    size = 'md'
}: IconProps) => {
    return (
        <img src={isDarkTheme ? darkIcon : lightIcon} alt="icon" />
    );
};

export default Icon;