"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateAgentName = validateAgentName;
exports.validatePrice = validatePrice;
function validateAgentName(name) {
    // Kebab-case check
    if (!/^[a-z][a-z0-9-]*$/.test(name)) {
        return 'Use lowercase letters, numbers, and hyphens only (e.g., my-agent)';
    }
    // Length check
    if (name.length < 3) {
        return 'Name must be at least 3 characters';
    }
    if (name.length > 50) {
        return 'Name must be less than 50 characters';
    }
    return true;
}
function validatePrice(price) {
    if (price <= 0) {
        return 'Price must be greater than 0';
    }
    if (price > 100) {
        return 'Price must be less than $100';
    }
    return true;
}
