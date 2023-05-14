'use client';

import Link from "next/link";
import clsx from "clsx";

interface MobileItemProps {
    icon: any;
    href: string;
    onclick?: () => void;
    active?: boolean;
}

const MobileItem: React.FC<MobileItemProps> = ({
    icon: Icon,
    href,
    onclick,
    active
}) => {

    const handleClick = () => {
        if (onclick) {
            return onclick();
        }
    }

    return (
        <Link 
            onClick={handleClick}
            href={href}
            className={clsx(`
                group
                flex
                gap-x-3
                text-sm
                leading-6
                font-semibold
                w-full
                justify-center
                p-4
                
                hover:text-gray-300
                hover:bg-gray-900
            `,
                active ? 'bg-gray-900 text-sky-600' : 'text-gray-50'
            )}
        >
            <Icon className="h-6 w-6" />
        </Link>
    )
}

export default MobileItem