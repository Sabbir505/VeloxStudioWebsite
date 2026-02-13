import { UINode } from '../types';

const SELF_CLOSING_TAGS = ['img', 'input', 'br', 'hr', 'meta', 'link'];

/**
 * VALIDATOR:
 * Checks if the JSON object returned by AI conforms to the UINode structure.
 * Returns true if valid, false otherwise.
 * Can be expanded to enforce specific design system rules.
 */
export const validateUISchema = (node: any): node is UINode => {
    if (!node || typeof node !== 'object') return false;
    
    // Must have a tag
    if (typeof node.tag !== 'string') return false;
    
    // Attributes check (optional)
    if (node.attributes && typeof node.attributes !== 'object') return false;
    
    // Children check
    if (node.children) {
        if (!Array.isArray(node.children)) return false;
        for (const child of node.children) {
            // Child can be string or node
            if (typeof child !== 'string' && !validateUISchema(child)) return false;
        }
    }
    
    return true;
};

/**
 * HTML GENERATOR:
 * Converts the Abstract UI Schema (UINode) into a valid HTML string.
 * Applies Tailwind classes and handles specific fixes for export (e.g. min-h-full).
 */
export const uiSchemaToHTML = (node: UINode): string => {
    if (!node) return '';
    
    const tagName = node.tag.toLowerCase();
    
    // Build Attributes
    let attrs = '';
    
    // Handle 'class' (Schema) or 'className' (React habit)
    const className = node.class || node.className || '';
    if (className) {
        // Sanitize classes for full-height export
        let safeClass = className
            .replace(/h-screen/g, 'min-h-full')
            .replace(/min-h-screen/g, 'min-h-full')
            .replace(/h-\[100vh\]/g, 'min-h-full')
            .replace(/overflow-y-auto/g, '') 
            .replace(/overflow-y-scroll/g, '')
            .replace(/overflow-hidden/g, '');
            
        // Fix giant inputs
        safeClass = safeClass.replace(/\bh-(24|32|40|48|56|64)\b/g, 'h-12');

        attrs += ` class="${safeClass}"`;
    }
    
    // Specific attributes
    if (node.src) attrs += ` src="${node.src}"`;
    if (node.alt) attrs += ` alt="${node.alt}"`;
    if (node.placeholder) attrs += ` placeholder="${node.placeholder}"`;
    if (node.type && tagName === 'input') attrs += ` type="${node.type}"`;
    
    // Generic attributes bag
    if (node.attributes) {
        Object.entries(node.attributes).forEach(([key, val]) => {
            if(val) attrs += ` ${key}="${val}"`;
        });
    }

    // Build Content
    let content = '';
    
    // Text content
    if (node.text) {
        content += node.text;
    }
    
    // Recursive Children
    if (node.children && node.children.length > 0) {
        content += node.children.map(child => {
            if (typeof child === 'string') return child;
            return uiSchemaToHTML(child);
        }).join('');
    }

    // Return HTML string
    if (SELF_CLOSING_TAGS.includes(tagName)) {
        return `<${tagName}${attrs} />`;
    }
    
    return `<${tagName}${attrs}>${content}</${tagName}>`;
};