const SWAP_DATA = {
    // ==========================================
    // 1. CLIENT LAYER (UI COMPONENTS)
    // ==========================================
    "rich-admin-dashboard": `
        <div class="rich-path"><code>src/pages/admin/Dashboard.jsx</code></div>
        <p>The central control hub for full operational oversight. Admins can manage vendors, track daily reports, oversee franchises, view all orders across the system, and manage finances.</p>
        <div class="rich-code-block">
            <strong>Key Code Snippet:</strong>
<pre><code>// Calculates received items effectively handling adjustments
const receivedItems = useMemo(() => {
  return orders
    .filter(o => o.status === 'RECEIVED')
    .flatMap(order => (order.items || []).map(item => ({
      ...item,
      effective_line_total: item.unit_price * item.received_qty
    })));
}, [orders]);
</code></pre>
        </div>
        <p><strong>Example:</strong> If a kitchen dispatches 50 burgers but the franchise receives 48, the Admin Dashboard flags the discrepancy and adjusts the final ledger via the <code>effective_line_total</code> logic.</p>
    `,
    "rich-kitchen-dashboard": `
        <div class="rich-path"><code>src/pages/kitchen/Dashboard.jsx</code></div>
        <p>The production hub where the kitchen team receives real-time incoming orders, processes discrepancies, and manages local staff. Focused heavily on fulfilling daily franchise demands with zero errors.</p>
        <div class="rich-code-block">
            <strong>Key Code Snippet:</strong>
<pre><code>// Fetch only franchises assigned to this specific kitchen
const myFranchises = franchisesData.filter(f =>
  f.vendor_1_id === vendorId || 
  f.vendor_2_id === vendorId || 
  f.vendor_3_id === vendorId
);
setAssignedFranchises(myFranchises);
</code></pre>
        </div>
        <p><strong>Example:</strong> A Kitchen Manager logs in and instantly sees only the 3 franchises they are responsible for supplying, ensuring strict data segregation from other kitchens.</p>
    `,
    "rich-franchise-ordering": `
        <div class="rich-path"><code>src/pages/franchise/Dashboard.jsx</code></div>
        <p>The dedicated portal for franchises to create and edit their supply orders, confirm receipts, manage their own staff attendance, and log daily entries or complaints directly to the central hub.</p>
        <div class="rich-code-block">
            <strong>Key Code Snippet:</strong>
<pre><code>// Real-time synchronization for order status updates
useEffect(() => {
  const unsubscribe = subscribe(['ORDER_STATUS', 'ORDER_NEW'], () => {
    console.log('🔄 Dashboard refreshing orders due to notification');
    fetchOrders();
  });
  return unsubscribe;
}, [subscribe]);
</code></pre>
        </div>
        <p><strong>Example:</strong> The moment a Kitchen accepts an order, the Franchise Dashboard automatically updates without requiring a page refresh, using the <code>NotificationContext</code>.</p>
    `,
    "rich-auditor-tools": `
        <div class="rich-path"><code>src/pages/auditor/Dashboard.jsx</code></div>
        <p>Specialized interface for system auditors to conduct checks, file hygiene monitor reports, and maintain the integrity of operations through MISA Audits. Ensures compliance across all nodes.</p>
        <div class="rich-code-block">
            <strong>Key Code Snippet:</strong>
<pre><code>// Color-coded scoring engine for visual compliance tracking
const getScoreColor = (score) => {
    if (score >= 80) return '#10b981'; // Green (Pass)
    if (score >= 60) return '#f59e0b'; // Yellow (Warning)
    return '#ef4444';  // Red (Fail)
};
</code></pre>
        </div>
        <p><strong>Diagram/Flow:</strong> <br/> Auditor arrives at franchise ➔ Fills out checklist form ➔ System auto-calculates % score ➔ If score is below 80%, franchise is flagged and Admin is alerted.</p>
    `,
    "rich-role-router": `
        <div class="rich-path"><code>src/App.jsx</code></div>
        <p>The core React routing logic that intercepts every page request. It securely verifies the user's role and automatically redirects them to their appropriate dashboard, preventing any data leakage.</p>
        <div class="rich-code-block">
            <strong>Conceptual Snippet:</strong>
<pre><code>// Strict role-based gateway
&lt;Route path="/admin/*" element={
  &lt;ProtectedRoute allowedRoles={['ADMIN']}&gt;
    &lt;AdminRoutes /&gt;
  &lt;/ProtectedRoute&gt;
} /&gt;
</code></pre>
        </div>
        <p><strong>Example:</strong> If a Franchise user manually types <code>/admin/dashboard</code> into the URL bar, the Role Router instantly detects the mismatch and forces a redirect to <code>/franchise/dashboard</code>.</p>
    `,
    "rich-auth-context": `
        <div class="rich-path"><code>src/context/AuthContext.jsx</code></div>
        <p>The React Context providing system-wide state management. It wraps the entire application to provide real-time user session data, authentication status, and role verification directly from the backend.</p>
        <div class="rich-code-block">
            <strong>Key Code Snippet:</strong>
<pre><code>// Persisting the user session securely
const login = async (email, password) => {
  const { user, token } = await authService.login(email, password);
  localStorage.setItem('supply_user', JSON.stringify(user));
  localStorage.setItem('supply_token', token);
  setUser(user);
  setIsAuthenticated(true);
};
</code></pre>
        </div>
        <p><strong>Example:</strong> Components across the app can simply call <code>const { user } = useAuth();</code> to access the current user's ID, role, and profile data without prop-drilling.</p>
    `,

    // ==========================================
    // 2. ROLES (ACCESS CONTROL)
    // ==========================================
    "role-admin": `
        <div class="rich-path"><code>Role: ADMIN</code></div>
        <p>The highest level of access in the SWAP system. Admins have complete visibility over all financial ledgers, inventory cross-checks, user management, and configuration details.</p>
        <p><strong>Key Permissions:</strong> Create/Edit vendors and franchises, approve or reject financial disputes, view full analytics across all branches, manage pricing.</p>
    `,
    "role-kitchen": `
        <div class="rich-path"><code>Role: VENDOR / KITCHEN</code></div>
        <p>Responsible for fulfilling supply chain requests. They receive orders from their specifically assigned franchises and dispatch inventory.</p>
        <p><strong>Key Permissions:</strong> View assigned franchises, accept/reject incoming orders, update dispatch quantities, log kitchen staff attendance.</p>
    `,
    "role-franchise": `
        <div class="rich-path"><code>Role: FRANCHISE</code></div>
        <p>The retail end of the supply chain. They request raw materials and report their daily closing stock and cash entries.</p>
        <p><strong>Key Permissions:</strong> Create daily purchase orders, report received stock discrepancies, log daily sales/entries, manage local franchise staff.</p>
    `,
    "role-auditor": `
        <div class="rich-path"><code>Role: AUDITOR</code></div>
        <p>Quality assurance personnel who visit physical franchise and kitchen locations to ensure compliance with standards.</p>
        <p><strong>Key Permissions:</strong> Submit MISA audit forms, upload compliance photos, score staff performance metrics.</p>
    `,
    "role-franchise-staff": `
        <div class="rich-path"><code>Role: FRANCHISE_STAFF</code></div>
        <p>Employees working at the franchise location. Their access is heavily restricted to their own specific tasks and punch-ins.</p>
        <p><strong>Key Permissions:</strong> Log attendance, view personal scoring, submit complaints (if permitted).</p>
    `,
    "role-kitchen-staff": `
        <div class="rich-path"><code>Role: KITCHEN_STAFF</code></div>
        <p>Employees operating within the central or vendor kitchens handling food production and dispatch.</p>
        <p><strong>Key Permissions:</strong> Mark attendance, view specific daily assignments.</p>
    `,
    "role-hygiene": `
        <div class="rich-path"><code>Role: HYGIENE_MONITOR</code></div>
        <p>A specialized sub-auditor role strictly focused on cleanliness and food safety standards across all facilities.</p>
        <p><strong>Key Permissions:</strong> Submit daily hygiene checklists, flag critical health violations.</p>
    `,
    "role-mclean": `
        <div class="rich-path"><code>Role: MCLEAN</code></div>
        <p>Special operations and deep-cleaning unit. Tracked separately from regular staff for specialized assignment dispatch.</p>
        <p><strong>Key Permissions:</strong> View assigned cleaning schedules, confirm job completions.</p>
    `,

    // ==========================================
    // 3. BACKEND (LAMBDAS)
    // ==========================================
    "lambda-auth": `
        <div class="rich-path"><code>backend/lambdas/auth/index.js</code></div>
        <p>Handles user authentication, JWT token generation, and password verification against DynamoDB.</p>
        <div class="rich-code-block"><pre><code>// Example: Verifies password hash and returns signed JWT with user Role</code></pre></div>

        <div style="margin-top: 10px; padding: 8px; background: rgba(16, 185, 129, 0.1); border-left: 3px solid #10b981; font-size: 0.85rem;">
            <strong style="display:block; margin-bottom: 4px; color: #10b981;">Linked Tables:</strong>
            <ul style="margin: 0; padding-left: 20px; list-style-type: square; color: #e2e8f0;">
            <li><code>USERS_TABLE</code></li>
            </ul>
        </div>
    `,
    "lambda-orders": `
        <div class="rich-path"><code>backend/lambdas/orders/index.js</code></div>
        <p>The busiest microservice. Handles the creation, updating, and querying of Purchase Orders between franchises and kitchens.</p>
        <div class="rich-code-block"><pre><code>// Uses DynamoDB Transactions to deduct stock and create order records simultaneously</code></pre></div>

        <div style="margin-top: 10px; padding: 8px; background: rgba(16, 185, 129, 0.1); border-left: 3px solid #10b981; font-size: 0.85rem;">
            <strong style="display:block; margin-bottom: 4px; color: #10b981;">Linked Tables:</strong>
            <ul style="margin: 0; padding-left: 20px; list-style-type: square; color: #e2e8f0;">
            <li><code>ORDERS_TABLE</code></li>
            <li><code>ORDER_ITEMS_TABLE</code></li>
            <li><code>FRANCHISES_TABLE</code></li>
            <li><code>VENDORS_TABLE</code></li>
            </ul>
        </div>
    `,
    "lambda-items": `
        <div class="rich-path"><code>backend/lambdas/items/index.js</code></div>
        <p>Manages the central catalog of inventory items, their unit prices, and their mappings to specific vendors.</p>

        <div style="margin-top: 10px; padding: 8px; background: rgba(16, 185, 129, 0.1); border-left: 3px solid #10b981; font-size: 0.85rem;">
            <strong style="display:block; margin-bottom: 4px; color: #10b981;">Linked Tables:</strong>
            <ul style="margin: 0; padding-left: 20px; list-style-type: square; color: #e2e8f0;">
            <li><code>ITEMS_TABLE</code></li>
            <li><code>VENDORS_TABLE</code></li>
            </ul>
        </div>
    `,
    "lambda-discrepancies": `
        <div class="rich-path"><code>backend/lambdas/discrepancies/index.js</code></div>
        <p>Specialized logic that runs when a franchise reports receiving fewer items than the kitchen claims to have dispatched.</p>

        <div style="margin-top: 10px; padding: 8px; background: rgba(16, 185, 129, 0.1); border-left: 3px solid #10b981; font-size: 0.85rem;">
            <strong style="display:block; margin-bottom: 4px; color: #10b981;">Linked Tables:</strong>
            <ul style="margin: 0; padding-left: 20px; list-style-type: square; color: #e2e8f0;">
            <li><code>DISCREPANCIES_TABLE</code></li>
            <li><code>ORDERS_TABLE</code></li>
            </ul>
        </div>
    `,
    "lambda-rista-sales": `
        <div class="rich-path"><code>backend/lambdas/rista-sales/index.js</code></div>
        <p>Integrates with the Rista POS system to ingest end-of-day sales data for automated variance calculations.</p>

        <div style="margin-top: 10px; padding: 8px; background: rgba(16, 185, 129, 0.1); border-left: 3px solid #10b981; font-size: 0.85rem;">
            <strong style="display:block; margin-bottom: 4px; color: #10b981;">Linked Tables:</strong>
            <ul style="margin: 0; padding-left: 20px; list-style-type: square; color: #e2e8f0;">
            <li><code>INGREDIENT_ALIASES_TABLE</code></li>
            <li><code>RECIPE_MAPPINGS_TABLE</code></li>
            <li><code>DAILY_REPORTS_TABLE</code></li>
            </ul>
        </div>
    `,
    "lambda-staff-scoring": `
        <div class="rich-path"><code>backend/lambdas/staff-scoring/index.js</code></div>
        <p>Calculates employee performance scores based on attendance, audit results, and manager feedback.</p>

        <div style="margin-top: 10px; padding: 8px; background: rgba(16, 185, 129, 0.1); border-left: 3px solid #10b981; font-size: 0.85rem;">
            <strong style="display:block; margin-bottom: 4px; color: #10b981;">Linked Tables:</strong>
            <ul style="margin: 0; padding-left: 20px; list-style-type: square; color: #e2e8f0;">
            <li><code>STAFF_SCORES_TABLE</code></li>
            <li><code>STAFF_TABLE</code></li>
            </ul>
        </div>
    `,
    "lambda-attendance": `
        <div class="rich-path"><code>backend/lambdas/supply-attendance/index.js</code></div>
        <p>Processes check-in/check-out events for both Kitchen and Franchise staff.</p>

        <div style="margin-top: 10px; padding: 8px; background: rgba(16, 185, 129, 0.1); border-left: 3px solid #10b981; font-size: 0.85rem;">
            <strong style="display:block; margin-bottom: 4px; color: #10b981;">Linked Tables:</strong>
            <ul style="margin: 0; padding-left: 20px; list-style-type: square; color: #e2e8f0;">
            <li><code>ATTENDANCE_TABLE</code></li>
            <li><code>STAFF_TABLE</code></li>
            </ul>
        </div>
    `,
    "lambda-audits": `
        <div class="rich-path"><code>backend/lambdas/supply-audits/index.js</code></div>
        <p>Stores and evaluates standard operational audit reports submitted by auditors.</p>

        <div style="margin-top: 10px; padding: 8px; background: rgba(16, 185, 129, 0.1); border-left: 3px solid #10b981; font-size: 0.85rem;">
            <strong style="display:block; margin-bottom: 4px; color: #10b981;">Linked Tables:</strong>
            <ul style="margin: 0; padding-left: 20px; list-style-type: square; color: #e2e8f0;">
            <li><code>AUDITS_TABLE</code></li>
            </ul>
        </div>
    `,
    "lambda-complaints": `
        <div class="rich-path"><code>backend/lambdas/supply-complaints/index.js</code></div>
        <p>A ticketing system microservice handling issue reports raised by franchises against vendors.</p>

        <div style="margin-top: 10px; padding: 8px; background: rgba(16, 185, 129, 0.1); border-left: 3px solid #10b981; font-size: 0.85rem;">
            <strong style="display:block; margin-bottom: 4px; color: #10b981;">Linked Tables:</strong>
            <ul style="margin: 0; padding-left: 20px; list-style-type: square; color: #e2e8f0;">
            <li><code>supply_complaints</code></li>
            </ul>
        </div>
    `,
    "lambda-daily-reports": `
        <div class="rich-path"><code>backend/lambdas/supply-daily-reports/index.js</code></div>
        <p>Aggregates End-Of-Day (EOD) data from franchises, matching cash in register against POS sales.</p>

        <div style="margin-top: 10px; padding: 8px; background: rgba(16, 185, 129, 0.1); border-left: 3px solid #10b981; font-size: 0.85rem;">
            <strong style="display:block; margin-bottom: 4px; color: #10b981;">Linked Tables:</strong>
            <ul style="margin: 0; padding-left: 20px; list-style-type: square; color: #e2e8f0;">
            <li><code>DAILY_REPORTS_TABLE</code></li>
            <li><code>FRANCHISES_TABLE</code></li>
            </ul>
        </div>
    `,
    "lambda-franchises": `
        <div class="rich-path"><code>backend/lambdas/supply-franchises/index.js</code></div>
        <p>CRUD operations for Franchise configurations (e.g., assigning a franchise to a specific kitchen).</p>

        <div style="margin-top: 10px; padding: 8px; background: rgba(16, 185, 129, 0.1); border-left: 3px solid #10b981; font-size: 0.85rem;">
            <strong style="display:block; margin-bottom: 4px; color: #10b981;">Linked Tables:</strong>
            <ul style="margin: 0; padding-left: 20px; list-style-type: square; color: #e2e8f0;">
            <li><code>FRANCHISES_TABLE</code></li>
            <li><code>USERS_TABLE</code></li>
            </ul>
        </div>
    `,
    "lambda-hygiene": `
        <div class="rich-path"><code>backend/lambdas/supply-hygiene-monitors/index.js</code></div>
        <p>Processes hygiene specific checklists and alerts admins if critical health scores drop.</p>

        <div style="margin-top: 10px; padding: 8px; background: rgba(16, 185, 129, 0.1); border-left: 3px solid #10b981; font-size: 0.85rem;">
            <strong style="display:block; margin-bottom: 4px; color: #10b981;">Linked Tables:</strong>
            <ul style="margin: 0; padding-left: 20px; list-style-type: square; color: #e2e8f0;">
            <li><code>HYGIENE_MONITORS_TABLE</code></li>
            </ul>
        </div>
    `,
    "lambda-misa": `
        <div class="rich-path"><code>backend/lambdas/supply-misa-audits/index.js</code></div>
        <p>Complex logic for the comprehensive MISA (Master Inspection) audits.</p>

        <div style="margin-top: 10px; padding: 8px; background: rgba(16, 185, 129, 0.1); border-left: 3px solid #10b981; font-size: 0.85rem;">
            <strong style="display:block; margin-bottom: 4px; color: #10b981;">Linked Tables:</strong>
            <ul style="margin: 0; padding-left: 20px; list-style-type: square; color: #e2e8f0;">
            <li><code>MISA_AUDITS_TABLE</code></li>
            </ul>
        </div>
    `,
    "lambda-notifications": `
        <div class="rich-path"><code>backend/lambdas/supply-notifications/index.js</code></div>
        <p>WebSocket or SNS integration pushing real-time alerts to the frontend React app.</p>

        <div style="margin-top: 10px; padding: 8px; background: rgba(16, 185, 129, 0.1); border-left: 3px solid #10b981; font-size: 0.85rem;">
            <strong style="display:block; margin-bottom: 4px; color: #10b981;">Linked Tables:</strong>
            <ul style="margin: 0; padding-left: 20px; list-style-type: square; color: #e2e8f0;">
            <li><code>NOTIFICATIONS_TABLE</code></li>
            </ul>
        </div>
    `,
    "lambda-photos": `
        <div class="rich-path"><code>backend/lambdas/supply-photos/index.js</code></div>
        <p>Generates pre-signed S3 URLs so the frontend can securely upload audit or discrepancy photos.</p>

        <div style="margin-top: 10px; padding: 8px; background: rgba(16, 185, 129, 0.1); border-left: 3px solid #10b981; font-size: 0.85rem;">
            <strong style="display:block; margin-bottom: 4px; color: #10b981;">Linked Tables:</strong>
            <ul style="margin: 0; padding-left: 20px; list-style-type: square; color: #e2e8f0;">
            <li><code>S3 Buckets</code></li>
            <li><code>AUDITS_TABLE</code></li>
            </ul>
        </div>
    `,
    "lambda-staff": `
        <div class="rich-path"><code>backend/lambdas/supply-staff/index.js</code></div>
        <p>CRUD operations for managing employee profiles, roles, and assigned locations.</p>

        <div style="margin-top: 10px; padding: 8px; background: rgba(16, 185, 129, 0.1); border-left: 3px solid #10b981; font-size: 0.85rem;">
            <strong style="display:block; margin-bottom: 4px; color: #10b981;">Linked Tables:</strong>
            <ul style="margin: 0; padding-left: 20px; list-style-type: square; color: #e2e8f0;">
            <li><code>STAFF_TABLE</code></li>
            <li><code>USERS_TABLE</code></li>
            </ul>
        </div>
    `,
    "lambda-vendors": `
        <div class="rich-path"><code>backend/lambdas/supply-vendors/index.js</code></div>
        <p>CRUD operations for Kitchens/Vendors, managing their margins and item catalogs.</p>

        <div style="margin-top: 10px; padding: 8px; background: rgba(16, 185, 129, 0.1); border-left: 3px solid #10b981; font-size: 0.85rem;">
            <strong style="display:block; margin-bottom: 4px; color: #10b981;">Linked Tables:</strong>
            <ul style="margin: 0; padding-left: 20px; list-style-type: square; color: #e2e8f0;">
            <li><code>VENDORS_TABLE</code></li>
            <li><code>USERS_TABLE</code></li>
            </ul>
        </div>
    `,
    "lambda-payments": `
        <div class="rich-path"><code>backend/lambdas/vendor-payments/index.js</code></div>
        <p>Calculates and logs the final payouts to vendors, factoring in their margins and any discrepancy deductions.</p>

        <div style="margin-top: 10px; padding: 8px; background: rgba(16, 185, 129, 0.1); border-left: 3px solid #10b981; font-size: 0.85rem;">
            <strong style="display:block; margin-bottom: 4px; color: #10b981;">Linked Tables:</strong>
            <ul style="margin: 0; padding-left: 20px; list-style-type: square; color: #e2e8f0;">
            <li><code>PAYMENTS_TABLE</code></li>
            <li><code>VENDORS_TABLE</code></li>
            <li><code>ORDERS_TABLE</code></li>
            <li><code>DISCREPANCIES_TABLE</code></li>
            </ul>
        </div>
    `,

    // ==========================================
    // 4. DATABASE (DYNAMODB)
    // ==========================================
    "db-partition": `
        <div class="rich-path"><code>DynamoDB Architecture</code></div>
        <p><strong>Partition Keys (PK)</strong> dictate which physical server node stores the data. SWAP uses prefixed strings like <code>USER#123</code> or <code>ORDER#555</code> to uniquely separate entity domains.</p>
    `,
    "db-sort": `
        <div class="rich-path"><code>DynamoDB Architecture</code></div>
        <p><strong>Sort Keys (SK)</strong> allow sorting and range queries within a partition. For example, an order might have <code>PK: FRANCHISE#123</code> and <code>SK: ORDER_DATE#2026-05-09</code> to quickly fetch recent orders.</p>
    `,
    "db-gsi": `
        <div class="rich-path"><code>DynamoDB Architecture</code></div>
        <p><strong>Global Secondary Indexes (GSI)</strong> allow querying the database by attributes other than the primary key. For example, finding all orders assigned to <code>VENDOR#999</code> across all franchises.</p>
    `,
    "db-multi-table": `
        <div class="rich-path"><code>DynamoDB Architecture</code></div>
        <p>SWAP leverages <strong>Multi-Table Design</strong>. Users, Orders, and Items all live in the exact same table. They are distinguished by their PK/SK patterns, reducing cross-table joins and improving extreme scale performance.</p>
    `,
    "db-chron": `
        <div class="rich-path"><code>AWS EventBridge + Lambda</code></div>
        <p><strong>Chron-jobs</strong> automatically trigger Lambdas at midnight. They run batch aggregations, finalize daily financial ledgers, and reset the PO cycles for the next day.</p>
    `,
    "db-nosql": `
        <div class="rich-path"><code>Amazon DynamoDB</code></div>
        <p>As a <strong>NoSQL</strong> database, DynamoDB doesn't use strict SQL schemas. This allows SWAP to easily add new features (like an extra photo field on an audit) without executing database migrations.</p>
    `,

    // ==========================================

    "table-users": `
        <div class="rich-path"><code>DynamoDB Table</code></div>
        <p><strong>USERS_TABLE</strong>: Stores login credentials, password hashes, and system roles (Admin, Vendor, Franchise, etc.)</p>

        <div style="margin-top: 10px; padding: 8px; background: rgba(139, 92, 246, 0.1); border-left: 3px solid #8b5cf6; font-size: 0.85rem;">
            <strong style="display:block; margin-bottom: 4px; color: #8b5cf6;">Linked Lambdas:</strong>
            <ul style="margin: 0; padding-left: 20px; list-style-type: square; color: #e2e8f0;">
            <li><code>lambda-auth</code></li>
            <li><code>lambda-franchises</code></li>
            <li><code>lambda-staff</code></li>
            <li><code>lambda-vendors</code></li>
            </ul>
        </div>
    `,
    "table-orders": `
        <div class="rich-path"><code>DynamoDB Table</code></div>
        <p><strong>ORDERS_TABLE</strong>: The core transactional table. Stores Purchase Orders, dispatch status, received status, and grand totals.</p>

        <div style="margin-top: 10px; padding: 8px; background: rgba(139, 92, 246, 0.1); border-left: 3px solid #8b5cf6; font-size: 0.85rem;">
            <strong style="display:block; margin-bottom: 4px; color: #8b5cf6;">Linked Lambdas:</strong>
            <ul style="margin: 0; padding-left: 20px; list-style-type: square; color: #e2e8f0;">
            <li><code>lambda-orders</code></li>
            <li><code>lambda-discrepancies</code></li>
            <li><code>lambda-payments</code></li>
            </ul>
        </div>
    `,
    "table-items": `
        <div class="rich-path"><code>DynamoDB Table</code></div>
        <p><strong>ITEMS_TABLE</strong>: Central catalog of all ingredients and materials, linking them to specific vendors and default prices.</p>

        <div style="margin-top: 10px; padding: 8px; background: rgba(139, 92, 246, 0.1); border-left: 3px solid #8b5cf6; font-size: 0.85rem;">
            <strong style="display:block; margin-bottom: 4px; color: #8b5cf6;">Linked Lambdas:</strong>
            <ul style="margin: 0; padding-left: 20px; list-style-type: square; color: #e2e8f0;">
            <li><code>lambda-items</code></li>
            </ul>
        </div>
    `,
    "table-vendors": `
        <div class="rich-path"><code>DynamoDB Table</code></div>
        <p><strong>VENDORS_TABLE</strong>: Stores profiles for kitchens/suppliers, including their specific margins and location details.</p>

        <div style="margin-top: 10px; padding: 8px; background: rgba(139, 92, 246, 0.1); border-left: 3px solid #8b5cf6; font-size: 0.85rem;">
            <strong style="display:block; margin-bottom: 4px; color: #8b5cf6;">Linked Lambdas:</strong>
            <ul style="margin: 0; padding-left: 20px; list-style-type: square; color: #e2e8f0;">
            <li><code>lambda-orders</code></li>
            <li><code>lambda-items</code></li>
            <li><code>lambda-vendors</code></li>
            <li><code>lambda-payments</code></li>
            </ul>
        </div>
    `,
    "table-franchises": `
        <div class="rich-path"><code>DynamoDB Table</code></div>
        <p><strong>FRANCHISES_TABLE</strong>: Stores franchise profiles and their linked vendors (e.g., which kitchen supplies them).</p>

        <div style="margin-top: 10px; padding: 8px; background: rgba(139, 92, 246, 0.1); border-left: 3px solid #8b5cf6; font-size: 0.85rem;">
            <strong style="display:block; margin-bottom: 4px; color: #8b5cf6;">Linked Lambdas:</strong>
            <ul style="margin: 0; padding-left: 20px; list-style-type: square; color: #e2e8f0;">
            <li><code>lambda-orders</code></li>
            <li><code>lambda-daily-reports</code></li>
            <li><code>lambda-franchises</code></li>
            </ul>
        </div>
    `,
    "table-discrepancies": `
        <div class="rich-path"><code>DynamoDB Table</code></div>
        <p><strong>DISCREPANCIES_TABLE</strong>: Records instances where a franchise received fewer items than dispatched, used for vendor payment deductions.</p>

        <div style="margin-top: 10px; padding: 8px; background: rgba(139, 92, 246, 0.1); border-left: 3px solid #8b5cf6; font-size: 0.85rem;">
            <strong style="display:block; margin-bottom: 4px; color: #8b5cf6;">Linked Lambdas:</strong>
            <ul style="margin: 0; padding-left: 20px; list-style-type: square; color: #e2e8f0;">
            <li><code>lambda-discrepancies</code></li>
            <li><code>lambda-payments</code></li>
            </ul>
        </div>
    `,
    "table-payments": `
        <div class="rich-path"><code>DynamoDB Table</code></div>
        <p><strong>PAYMENTS_TABLE</strong>: Logs the final calculated payouts to vendors after margin and discrepancy adjustments.</p>

        <div style="margin-top: 10px; padding: 8px; background: rgba(139, 92, 246, 0.1); border-left: 3px solid #8b5cf6; font-size: 0.85rem;">
            <strong style="display:block; margin-bottom: 4px; color: #8b5cf6;">Linked Lambdas:</strong>
            <ul style="margin: 0; padding-left: 20px; list-style-type: square; color: #e2e8f0;">
            <li><code>lambda-payments</code></li>
            </ul>
        </div>
    `,
    "table-audits": `
        <div class="rich-path"><code>DynamoDB Table</code></div>
        <p><strong>AUDITS_TABLE</strong>: Stores scores, timestamps, and compliance checklists submitted by field auditors.</p>

        <div style="margin-top: 10px; padding: 8px; background: rgba(139, 92, 246, 0.1); border-left: 3px solid #8b5cf6; font-size: 0.85rem;">
            <strong style="display:block; margin-bottom: 4px; color: #8b5cf6;">Linked Lambdas:</strong>
            <ul style="margin: 0; padding-left: 20px; list-style-type: square; color: #e2e8f0;">
            <li><code>lambda-audits</code></li>
            <li><code>lambda-photos</code></li>
            </ul>
        </div>
    `,
    // ==========================================
    // 5. AI & AUTOMATION
    // ==========================================
    "auto-scoring": `
        <div class="rich-path"><code>Staff Scoring Engine</code></div>
        <p>Automated algorithms ingest attendance data, audit failures, and manager feedback to output a live quantitative performance score for every employee, dictating bonuses and warnings.</p>
    `,
    "auto-discrepancy": `
        <div class="rich-path"><code>Discrepancy Resolver</code></div>
        <p>When an order is received with mismatched quantities, the system automatically isolates the cost of the missing items, flags the specific kitchen, and adjusts the vendor payment ledger without human intervention.</p>
    `,
    "auto-rista": `
        <div class="rich-path"><code>Rista POS API Sync</code></div>
        <p>The system automatically pulls raw sales data from the Rista Point-of-Sale terminal. It compares the theoretical inventory consumed against the actual physical stock reported by the franchise.</p>
    `
};