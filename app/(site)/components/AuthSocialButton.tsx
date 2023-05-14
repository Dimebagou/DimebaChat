import { IconType } from "react-icons";

interface AuthSocialButtonProps {
    icon: IconType;
    onClick: () => void;
}


const AuthSocialButton: React.FC<AuthSocialButtonProps> = ({
    icon: Icon,
    onClick
}) => {
    return (
       <button
            type="button"
            onClick={onClick}
            className="
                inline-flex
                w-full
                justify-center
                rounded-md
                bg-gray-950
                px-4
                py-2
                text-gray-200
                shadow-sm
                ring-1
                ring-inset
                hover:bg-gray-200
                hover:text-gray-950
                focus:outline-offset-0
            "
        >
            <Icon />
       </button>
    )
}

export default AuthSocialButton