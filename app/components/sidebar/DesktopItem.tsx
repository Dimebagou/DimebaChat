'use client';

import clsx from "clsx";
import Link from "next/link";

interface DesktopItemProps {
   label: string;
   icon: any;
   href: string;
   onclick?: () => void;
   active?: boolean;
}

const DesktopItem: React.FC<DesktopItemProps> = ({
   label,
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
       <li onClick={handleClick}>
            <Link 
                href={href}
                className={clsx(`
                    group
                    flex
                    gap-x-3
                    rounded-md
                    p-3
                    text-sm
                    leading-6
                    font-semibold
                    
                    hover:text-gray-300
                    hover:bg-gray-900
                `,
                    active ? 'bg-gray-900 text-sky-600'
                    : 'text-gray-50'
                )}
            >
                <Icon className="h-6 w-6 shrink-0" />
                <span className="sr-only">{label}</span>
            </Link>
       </li>
    )
}

export default DesktopItem