// backend/middleware/roleMiddleware.js

/**
 * Role-Based Access Control (RBAC)
 *
 * Usage:
 *
 * authorize("admin")
 * authorize("admin", "technician")
 */

export const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    try {
      // User not authenticated
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized. Please login first.",
        });
      }

      // User role missing
      if (!req.user.role) {
        return res.status(403).json({
          success: false,
          message: "Access denied. User role not found.",
        });
      }

      // Check permissions
      if (!allowedRoles.includes(req.user.role)) {
        return res.status(403).json({
          success: false,
          message: `Access denied. Required role: ${allowedRoles.join(
            ", "
          )}`,
        });
      }

      next();
    } catch (err) {
      console.error("Role Middleware Error:", err);

      return res.status(500).json({
        success: false,
        message: "Authorization failed.",
      });
    }
  };
};