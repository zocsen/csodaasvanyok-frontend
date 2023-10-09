import { useEffect, useRef, useState } from "react"
import './desktop-accordion.scss';

export default function DesktopAccordion() {
	const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
	return (
        <div ref={dropdownRef}>
            <button className="desktop-header-menu-btn" onClick={() => setIsOpen(!isOpen)}>
                Termékek
            </button>
            {isOpen && (
                <div className="desktop-accordion-container">
                    <ul className="popular">
                        <li>Item 1</li>
                        <li>Item 2</li>
                        <li>Item 3</li>
                    </ul>
                    <ul className="popular">
                        <li>Item 1</li>
                        <li>Item 2</li>
                        <li>Item 3</li>
                    </ul>
                    <ul className="popular">
                        <li>Item 1</li>
                        <li>Item 2</li>
                        <li>Item 3</li>
                    </ul>
                    <ul className="popular">
                        <li>Item 1</li>
                        <li>Item 2</li>
                        <li>Item 3</li>
                    </ul>
                    
                </div>
            )}
        </div>
    );
}