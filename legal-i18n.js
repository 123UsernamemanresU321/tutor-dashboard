(() => {
  const PRIVACY_HTML = {
    en: `
      <p>This Privacy Policy describes how personal information is collected, used, and protected in connection with the tutoring dashboard (“Dashboard”). By creating an account or using the Dashboard, you consent to these practices.</p>

      <h2>1. Information Collected</h2>
      <h3>1.1 Account Information</h3>
      <ul>
        <li>Name and phone number</li>
        <li>Email address (only if needed for receipts or communication)</li>
        <li>Login code / OTP and authentication tokens (used for sign-in)</li>
        <li>No passwords are stored</li>
      </ul>
      <h3>1.2 Academic Information</h3>
      <ul>
        <li>Subjects, session bookings, attendance, homework status, and resources accessed</li>
      </ul>
      <h3>1.3 Billing Information</h3>
      <ul>
        <li>Invoices and payment status only; no card or bank details are stored</li>
      </ul>
      <h3>1.4 Device-Only Data</h3>
      <p>Preferences and cached content may be stored locally (e.g., localStorage/IndexedDB). This data stays on your device unless you clear it.</p>
      <h3>1.5 Authentication</h3>
      <p>Sign-in uses a code-based flow. You receive a unique login code and use it to access the Dashboard. Supabase stores the authentication tokens required for access. No passwords are collected or stored.</p>

      <h2>2. Purpose of Use</h2>
      <ul>
        <li>Authenticate and manage accounts</li>
        <li>Schedule and track tutoring sessions, homework, and resources</li>
        <li>Display and manage invoices and payment status</li>
        <li>Communicate regarding lessons, changes, academic updates, and billing/service notices</li>
      </ul>
      <p>Service emails may be sent for invoices, overdue balances, session changes, security notices, and policy/domain updates. Marketing emails are sent only where explicit opt-in consent is recorded and can be withdrawn at any time.</p>

      <h2>3. Storage and Security</h2>
      <ul>
        <li>Supabase hosts authentication and academic data with industry-standard security.</li>
        <li>Locally stored preferences remain on your device and are removed if you clear browser data.</li>
        <li>Access is limited to me (the tutor) unless you request otherwise.</li>
      </ul>

      <h2>4. Sharing</h2>
      <p>Data is not sold or rented. Disclosure occurs only if legally required or if you request sharing with a parent/teacher. No sharing with schools without your direction.</p>

      <h2>5. Your Rights</h2>
      <ul>
        <li>Access, correct, export, or delete your data</li>
        <li>Withdraw from using the Dashboard at any time</li>
        <li>Submit requests via the contact below</li>
      </ul>

      <h2>6. Retention</h2>
      <p>Data is retained while you are an active student. You may request deletion when lessons end.</p>

      <h2>7. Minors</h2>
      <p>Only essential data is collected. No non-academic use. Parent/guardian instructions are followed, including deletion requests. Where required for billing or merchant-of-record compliance, parent/guardian involvement is required.</p>

      <h2>8. Updates</h2>
      <p>This policy may be updated as the Dashboard evolves. Material changes will be communicated.</p>

      <h2>9. Contact</h2>
      <ul>
        <li><strong>Operator and Service Provider:</strong> <span data-operator-name>OPERATOR_NAME</span></li>
        <li><strong>Merchant of Record:</strong> <span data-merchant-name>MERCHANT_NAME</span></li>
        <li><strong>Payment Processing:</strong> PayFast</li>
        <li><strong>Contact:</strong> <strong data-support-email>SUPPORT_EMAIL</strong></li>
        <li><strong>Business location:</strong> <span data-business-address>BUSINESS_ADDRESS</span></li>
      </ul>
    `,
    es: `
      <p>Esta Política de privacidad describe cómo se recopila, usa y protege la información personal en relación con el panel de tutorías (“Panel”). Al crear una cuenta o usar el Panel, aceptas estas prácticas.</p>

      <h2>1. Información recopilada</h2>
      <h3>1.1 Información de cuenta</h3>
      <ul>
        <li>Nombre y número de teléfono</li>
        <li>Dirección de correo electrónico (solo si se necesita para recibos o comunicación)</li>
        <li>Código de acceso/OTP y tokens de autenticación (para iniciar sesión)</li>
        <li>No se almacenan contraseñas</li>
      </ul>
      <h3>1.2 Información académica</h3>
      <ul>
        <li>Materias, reservas de sesiones, asistencia, estado de tareas y recursos consultados</li>
      </ul>
      <h3>1.3 Información de facturación</h3>
      <ul>
        <li>Solo facturas y estado de pago; no se almacenan datos de tarjetas ni bancarios</li>
      </ul>
      <h3>1.4 Datos del dispositivo</h3>
      <p>Las preferencias y contenido en caché pueden almacenarse localmente (por ejemplo, localStorage/IndexedDB). Estos datos permanecen en tu dispositivo a menos que los borres.</p>
      <h3>1.5 Autenticación</h3>
      <p>El inicio de sesión usa un flujo basado en código. Recibes un código único y lo usas para acceder al Panel. Supabase almacena los tokens necesarios. No se recopilan ni almacenan contraseñas.</p>

      <h2>2. Finalidad del uso</h2>
      <ul>
        <li>Autenticar y gestionar cuentas</li>
        <li>Programar y hacer seguimiento de sesiones, tareas y recursos</li>
        <li>Mostrar y gestionar facturas y estado de pago</li>
        <li>Comunicarnos sobre clases, cambios, actualizaciones académicas y avisos de facturación/servicio</li>
      </ul>
      <p>Podemos enviar correos de servicio para facturas, saldos vencidos, cambios de sesión, avisos de seguridad y actualizaciones de dominio/políticas. Los correos de marketing solo se envían con consentimiento explícito (opt-in) y puedes retirarlo en cualquier momento.</p>

      <h2>3. Almacenamiento y seguridad</h2>
      <ul>
        <li>Supabase aloja la autenticación y los datos académicos con seguridad estándar de la industria.</li>
        <li>Las preferencias almacenadas localmente permanecen en tu dispositivo y se eliminan si borras los datos del navegador.</li>
        <li>El acceso está limitado a mí (el tutor), salvo que solicites lo contrario.</li>
      </ul>

      <h2>4. Compartir</h2>
      <p>Los datos no se venden ni se alquilan. Solo se divulgan si la ley lo exige o si solicitas compartirlos con un padre/maestro. No se comparten con escuelas sin tu instrucción.</p>

      <h2>5. Tus derechos</h2>
      <ul>
        <li>Acceder, corregir, exportar o eliminar tus datos</li>
        <li>Dejar de usar el Panel en cualquier momento</li>
        <li>Enviar solicitudes mediante el contacto abajo</li>
      </ul>

      <h2>6. Retención</h2>
      <p>Los datos se conservan mientras seas un estudiante activo. Puedes solicitar la eliminación cuando terminen las clases.</p>

      <h2>7. Menores</h2>
      <p>Solo se recopilan datos esenciales. No hay uso no académico. Se siguen las instrucciones del padre/tutor, incluidas solicitudes de eliminación. Cuando sea necesario por facturación o cumplimiento, se requiere la participación del padre/tutor.</p>

      <h2>8. Actualizaciones</h2>
      <p>Esta política puede actualizarse a medida que evoluciona el Panel. Los cambios materiales se comunicarán.</p>

      <h2>9. Contacto</h2>
      <ul>
        <li><strong>Operador y proveedor del servicio:</strong> <span data-operator-name>OPERATOR_NAME</span></li>
        <li><strong>Comerciante de registro:</strong> <span data-merchant-name>MERCHANT_NAME</span></li>
        <li><strong>Procesamiento de pagos:</strong> PayFast</li>
        <li><strong>Contacto:</strong> <strong data-support-email>SUPPORT_EMAIL</strong></li>
        <li><strong>Ubicación comercial:</strong> <span data-business-address>BUSINESS_ADDRESS</span></li>
      </ul>
    `,
    fr: `
      <p>Cette politique de confidentialité décrit comment les informations personnelles sont collectées, utilisées et protégées dans le cadre du tableau de bord de tutorat (« Tableau de bord »). En créant un compte ou en utilisant le Tableau de bord, vous acceptez ces pratiques.</p>

      <h2>1. Informations collectées</h2>
      <h3>1.1 Informations de compte</h3>
      <ul>
        <li>Nom et numéro de téléphone</li>
        <li>Adresse email (uniquement si nécessaire pour les reçus ou la communication)</li>
        <li>Code de connexion / OTP et jetons d’authentification (utilisés pour se connecter)</li>
        <li>Aucun mot de passe n’est stocké</li>
      </ul>
      <h3>1.2 Informations académiques</h3>
      <ul>
        <li>Matières, réservations de séances, présence, état des devoirs et ressources consultées</li>
      </ul>
      <h3>1.3 Informations de facturation</h3>
      <ul>
        <li>Factures et état de paiement uniquement ; aucune donnée bancaire n’est stockée</li>
      </ul>
      <h3>1.4 Données locales</h3>
      <p>Les préférences et le contenu en cache peuvent être stockés localement (ex. localStorage/IndexedDB). Ces données restent sur votre appareil sauf suppression.</p>
      <h3>1.5 Authentification</h3>
      <p>La connexion utilise un code unique. Vous recevez un code et l’utilisez pour accéder au Tableau de bord. Supabase stocke les jetons nécessaires. Aucun mot de passe n’est collecté ou stocké.</p>

      <h2>2. Finalité de l’utilisation</h2>
      <ul>
        <li>Authentifier et gérer les comptes</li>
        <li>Planifier et suivre les séances, devoirs et ressources</li>
        <li>Afficher et gérer les factures et le statut de paiement</li>
        <li>Communiquer sur les cours, changements, mises à jour académiques et notifications de facturation/service</li>
      </ul>
      <p>Des emails de service peuvent être envoyés pour les factures, impayés, changements de séance, notifications de sécurité et mises à jour de domaine/politique. Les emails marketing ne sont envoyés qu’avec un consentement explicite (opt-in), révocable à tout moment.</p>

      <h2>3. Stockage et sécurité</h2>
      <ul>
        <li>Supabase héberge l’authentification et les données académiques avec une sécurité standard.</li>
        <li>Les préférences locales restent sur votre appareil et sont supprimées si vous effacez les données du navigateur.</li>
        <li>L’accès est limité à moi (le tuteur), sauf demande contraire.</li>
      </ul>

      <h2>4. Partage</h2>
      <p>Les données ne sont ni vendues ni louées. Elles ne sont divulguées que si la loi l’exige ou si vous demandez un partage avec un parent/enseignant. Aucun partage avec les écoles sans votre accord.</p>

      <h2>5. Vos droits</h2>
      <ul>
        <li>Accéder, corriger, exporter ou supprimer vos données</li>
        <li>Arrêter l’utilisation du Tableau de bord à tout moment</li>
        <li>Faire une demande via le contact ci‑dessous</li>
      </ul>

      <h2>6. Conservation</h2>
      <p>Les données sont conservées tant que vous êtes un élève actif. Vous pouvez demander la suppression à la fin des cours.</p>

      <h2>7. Mineurs</h2>
      <p>Seules les données essentielles sont collectées. Aucun usage non académique. Les instructions du parent/tuteur sont respectées, y compris la suppression. Lorsque requis pour la facturation, l’implication du parent/tuteur est nécessaire.</p>

      <h2>8. Mises à jour</h2>
      <p>Cette politique peut être mise à jour à mesure que le Tableau de bord évolue. Les changements importants seront communiqués.</p>

      <h2>9. Contact</h2>
      <ul>
        <li><strong>Opérateur et prestataire :</strong> <span data-operator-name>OPERATOR_NAME</span></li>
        <li><strong>Commerçant de référence :</strong> <span data-merchant-name>MERCHANT_NAME</span></li>
        <li><strong>Traitement des paiements :</strong> PayFast</li>
        <li><strong>Contact :</strong> <strong data-support-email>SUPPORT_EMAIL</strong></li>
        <li><strong>Adresse commerciale :</strong> <span data-business-address>BUSINESS_ADDRESS</span></li>
      </ul>
    `,
    zh: `
      <p>本隐私政策说明在辅导仪表板（“平台”）中，个人信息如何被收集、使用和保护。创建账户或使用平台即表示您同意这些做法。</p>

      <h2>1. 收集的信息</h2>
      <h3>1.1 账户信息</h3>
      <ul>
        <li>姓名和电话号码</li>
        <li>邮箱（仅在需要收据或沟通时使用）</li>
        <li>登录码/OTP 与认证令牌（用于登录）</li>
        <li>不存储密码</li>
      </ul>
      <h3>1.2 学术信息</h3>
      <ul>
        <li>科目、课程预约、出勤、作业状态及已访问资源</li>
      </ul>
      <h3>1.3 账单信息</h3>
      <ul>
        <li>仅保存发票与支付状态；不存储银行卡信息</li>
      </ul>
      <h3>1.4 本地数据</h3>
      <p>偏好设置和缓存内容可能保存在本地（如 localStorage/IndexedDB）。除非您清除浏览器数据，否则这些数据不会离开设备。</p>
      <h3>1.5 认证</h3>
      <p>登录采用验证码流程。您会收到唯一登录码用于访问平台。Supabase 存储访问所需的认证令牌。不收集或存储密码。</p>

      <h2>2. 使用目的</h2>
      <ul>
        <li>认证与管理账户</li>
        <li>安排并跟踪课程、作业与资源</li>
        <li>展示与管理发票与支付状态</li>
        <li>就课程、调整、学业更新以及账单/服务通知进行沟通</li>
      </ul>
      <p>我们可能发送服务类邮件（发票、逾期提醒、课程变更、安全通知、域名/政策更新）。营销邮件仅在获得明确同意（opt-in）后发送，且您可随时撤回同意。</p>

      <h2>3. 存储与安全</h2>
      <ul>
        <li>Supabase 以行业标准的安全方式托管认证与学术数据。</li>
        <li>本地偏好数据仅保存在设备中，清除浏览器数据后会被移除。</li>
        <li>除非您另有请求，访问仅限我（导师）。</li>
      </ul>

      <h2>4. 共享</h2>
      <p>数据不会出售或出租。仅在法律要求或您请求与家长/老师共享时披露。未经您指示不会与学校共享。</p>

      <h2>5. 您的权利</h2>
      <ul>
        <li>访问、更正、导出或删除您的数据</li>
        <li>随时停止使用平台</li>
        <li>通过下方联系方式提交请求</li>
      </ul>

      <h2>6. 保留期限</h2>
      <p>只要您是活跃学生，数据将被保留。课程结束后可申请删除。</p>

      <h2>7. 未成年人</h2>
      <p>仅收集必要数据，不作非学术用途。遵循家长/监护人的指示（包括删除请求）。如出于账务或合规需要，需家长/监护人参与。</p>

      <h2>8. 更新</h2>
      <p>本政策可能随平台发展而更新，重大变化将通知。</p>

      <h2>9. 联系方式</h2>
      <ul>
        <li><strong>运营与服务提供者：</strong> <span data-operator-name>OPERATOR_NAME</span></li>
        <li><strong>收款商户：</strong> <span data-merchant-name>MERCHANT_NAME</span></li>
        <li><strong>支付处理：</strong> PayFast</li>
        <li><strong>联系方式：</strong> <strong data-support-email>SUPPORT_EMAIL</strong></li>
        <li><strong>经营地址：</strong> <span data-business-address>BUSINESS_ADDRESS</span></li>
      </ul>
    `
  };

  const TOS_HTML = {
    en: `
      <p>These Terms of Service govern use of the tutoring dashboard (“Dashboard”) and related tutoring services. By accessing the Dashboard, you agree to these terms.</p>

      <h2>1. Eligibility</h2>
      <p>Use is limited to students receiving tutoring. If under 18, participation must be approved by a parent/guardian.</p>

      <h2>2. Account Responsibilities</h2>
      <ul>
        <li>Keep your login code confidential and use the Dashboard solely for tutoring purposes.</li>
        <li>Sign-in uses a code-based flow; no passwords are collected or stored.</li>
        <li>Notify me promptly of any suspected unauthorized access.</li>
        <li>Improper use may result in suspension or removal.</li>
      </ul>

      <h2>3. Acceptable Use</h2>
      <ul>
        <li>No hacking, tampering, or attempts to disrupt the Dashboard.</li>
        <li>No sharing of other students’ data or materials.</li>
        <li>No uploading of harmful files, scripts, or content.</li>
      </ul>

      <h2>4. Tutoring Sessions</h2>
      <h3>4.1 Booking & Attendance</h3>
      <p>Attend scheduled sessions and provide reasonable notice for cancellations or changes.</p>
      <h3>4.2 Cancellations</h3>
      <p>Late cancellations may incur charges; specific rules are communicated during booking.</p>

      <h2>5. Payments & Invoices</h2>
      <h3>5.1 Transparency</h3>
      <p>Invoices are visible on the Dashboard.</p>
      <h3>5.2 Payment</h3>
      <p>Payment is due by the stated due date using the agreed method. Payments are processed via PayFast on behalf of the Merchant of Record.</p>
      <h3>5.3 Late Payments</h3>
      <p>Repeated late payment may result in late fees and/or suspension of lessons.</p>
      <h3>5.4 Service Email Notices</h3>
      <p>By providing an email address and opting in on your profile, you authorize service notices by email (including invoices, overdue reminders, session changes, account-security notices, and policy/domain updates). Marketing emails require separate explicit consent.</p>

      <h2>Payments and Merchant Details</h2>
      <ul>
        <li><strong>Merchant of record:</strong> <span data-merchant-name>MERCHANT_NAME</span></li>
        <li><strong>Payment processor:</strong> PayFast</li>
        <li><strong>Operator/service delivery:</strong> <span data-operator-name>OPERATOR_NAME</span></li>
        <li><strong>Contact email:</strong> <span data-support-email>SUPPORT_EMAIL</span></li>
        <li><strong>Business address:</strong> <span data-business-address>BUSINESS_ADDRESS</span></li>
        <li><strong>Refund policy:</strong> Refunds for unused sessions are considered case-by-case via email.</li>
      </ul>

      <h2>6. Resources & Intellectual Property</h2>
      <p>All materials (notes, worksheets, videos, explanations) are for personal academic use only. Redistribution, resale, or misrepresentation is prohibited.</p>

      <h2>7. Privacy</h2>
      <p>Data is handled per the Privacy Policy. By using the Dashboard, you accept those practices.</p>

      <h2>8. Limitation of Liability</h2>
      <p>The Dashboard is provided “as is.” I am not liable for internet outages, third-party downtime, device failures, or academic outcomes.</p>

      <h2>9. Termination</h2>
      <p>Access may be restricted or terminated for policy violations, misuse, or when tutoring concludes. You may request account deletion at any time.</p>

      <h2>10. Governing Principles</h2>
      <p>These terms align with common standards for private tutoring and student data handling and are not tied to a specific legal jurisdiction.</p>

      <h2>11. Contact</h2>
      <p>Questions about these Terms: <strong data-support-email>SUPPORT_EMAIL</strong></p>
    `,
    es: `
      <p>Estos Términos de servicio regulan el uso del panel de tutorías (“Panel”) y los servicios relacionados. Al acceder al Panel, aceptas estos términos.</p>

      <h2>1. Elegibilidad</h2>
      <p>El uso está محدود a estudiantes que reciben tutoría. Si eres menor de 18 años, se requiere aprobación de un padre/tutor.</p>

      <h2>2. Responsabilidades de la cuenta</h2>
      <ul>
        <li>Mantén tu código de acceso confidencial y usa el Panel solo con fines académicos.</li>
        <li>El inicio de sesión es por código; no se recopilan ni almacenan contraseñas.</li>
        <li>Notifícame de inmediato cualquier acceso no autorizado sospechoso.</li>
        <li>El uso indebido puede resultar en suspensión o eliminación.</li>
      </ul>

      <h2>3. Uso aceptable</h2>
      <ul>
        <li>Prohibido hackear, manipular o intentar interrumpir el Panel.</li>
        <li>No compartir datos o materiales de otros estudiantes.</li>
        <li>No subir archivos o contenido dañino.</li>
      </ul>

      <h2>4. Sesiones de tutoría</h2>
      <h3>4.1 Reservas y asistencia</h3>
      <p>Asiste a las sesiones programadas y avisa con tiempo razonable para cancelaciones o cambios.</p>
      <h3>4.2 Cancelaciones</h3>
      <p>Las cancelaciones tardías pueden generar cargos; las reglas específicas se comunican al reservar.</p>

      <h2>5. Pagos y facturas</h2>
      <h3>5.1 Transparencia</h3>
      <p>Las facturas están visibles en el Panel.</p>
      <h3>5.2 Pago</h3>
      <p>El pago vence en la fecha indicada usando el método acordado. Los pagos se procesan vía PayFast en nombre del comerciante de registro.</p>
      <h3>5.3 Pagos tardíos</h3>
      <p>Los pagos tardíos repetidos pueden generar cargos y/o suspensión de clases.</p>
      <h3>5.4 Avisos por email de servicio</h3>
      <p>Al proporcionar un correo y activar el consentimiento en tu perfil, autorizas avisos de servicio por email (incluyendo facturas, recordatorios de vencimiento, cambios de sesión, seguridad de cuenta y actualizaciones de políticas/dominio). El marketing requiere consentimiento explícito separado.</p>

      <h2>Pagos y datos del comerciante</h2>
      <ul>
        <li><strong>Comerciante de registro:</strong> <span data-merchant-name>MERCHANT_NAME</span></li>
        <li><strong>Procesador de pagos:</strong> PayFast</li>
        <li><strong>Operador/servicio:</strong> <span data-operator-name>OPERATOR_NAME</span></li>
        <li><strong>Email de contacto:</strong> <span data-support-email>SUPPORT_EMAIL</span></li>
        <li><strong>Dirección comercial:</strong> <span data-business-address>BUSINESS_ADDRESS</span></li>
        <li><strong>Política de reembolsos:</strong> Se evalúan caso por caso por email.</li>
      </ul>

      <h2>6. Recursos y propiedad intelectual</h2>
      <p>Todos los materiales (apuntes, hojas, videos, explicaciones) son solo para uso académico personal. Está prohibida la redistribución o reventa.</p>

      <h2>7. Privacidad</h2>
      <p>Los datos se manejan según la Política de privacidad. Al usar el Panel, aceptas esas prácticas.</p>

      <h2>8. Limitación de responsabilidad</h2>
      <p>El Panel se ofrece “tal cual”. No me hago responsable de caídas de internet, terceros, fallas de dispositivos o resultados académicos.</p>

      <h2>9. Terminación</h2>
      <p>El acceso puede restringirse por incumplimientos, mal uso o cuando termina la tutoría. Puedes solicitar eliminación de la cuenta.</p>

      <h2>10. Principios generales</h2>
      <p>Estos términos se alinean con estándares comunes de tutorías privadas y manejo de datos de estudiantes, sin jurisdicción legal específica.</p>

      <h2>11. Contacto</h2>
      <p>Consultas sobre estos términos: <strong data-support-email>SUPPORT_EMAIL</strong></p>
    `,
    fr: `
      <p>Ces conditions d’utilisation régissent l’usage du tableau de bord de tutorat (« Tableau de bord ») et des services associés. En y accédant, vous acceptez ces conditions.</p>

      <h2>1. Éligibilité</h2>
      <p>L’usage est limité aux élèves bénéficiant du tutorat. Si vous avez moins de 18 ans, l’accord d’un parent/tuteur est requis.</p>

      <h2>2. Responsabilités du compte</h2>
      <ul>
        <li>Gardez votre code de connexion confidentiel et utilisez le Tableau de bord uniquement pour le tutorat.</li>
        <li>La connexion se fait par code ; aucun mot de passe n’est collecté.</li>
        <li>Informez-moi rapidement de tout accès non autorisé suspecté.</li>
        <li>Un usage abusif peut entraîner une suspension.</li>
      </ul>

      <h2>3. Utilisation acceptable</h2>
      <ul>
        <li>Interdiction de pirater, altérer ou perturber le Tableau de bord.</li>
        <li>Interdiction de partager les données ou supports d’autres élèves.</li>
        <li>Interdiction de téléverser des fichiers ou contenus nuisibles.</li>
      </ul>

      <h2>4. Séances de tutorat</h2>
      <h3>4.1 Réservation et présence</h3>
      <p>Assistez aux séances planifiées et prévenez à l’avance pour toute annulation ou modification.</p>
      <h3>4.2 Annulations</h3>
      <p>Les annulations tardives peuvent entraîner des frais ; les règles sont communiquées lors de la réservation.</p>

      <h2>5. Paiements et factures</h2>
      <h3>5.1 Transparence</h3>
      <p>Les factures sont visibles sur le Tableau de bord.</p>
      <h3>5.2 Paiement</h3>
      <p>Le paiement est dû à la date indiquée via le moyen convenu. Les paiements sont traités via PayFast pour le compte du commerçant de référence.</p>
      <h3>5.3 Retards de paiement</h3>
      <p>Des retards répétés peuvent entraîner des frais et/ou une suspension des cours.</p>
      <h3>5.4 Notifications email de service</h3>
      <p>En fournissant une adresse email et en activant le consentement dans votre profil, vous autorisez l’envoi de notifications de service par email (factures, rappels d’impayés, changements de séance, sécurité du compte et mises à jour de politique/domaine). Les emails marketing nécessitent un consentement explicite séparé.</p>

      <h2>Paiements et informations commerçant</h2>
      <ul>
        <li><strong>Commerçant de référence :</strong> <span data-merchant-name>MERCHANT_NAME</span></li>
        <li><strong>Processeur de paiement :</strong> PayFast</li>
        <li><strong>Opérateur/service :</strong> <span data-operator-name>OPERATOR_NAME</span></li>
        <li><strong>Email de contact :</strong> <span data-support-email>SUPPORT_EMAIL</span></li>
        <li><strong>Adresse commerciale :</strong> <span data-business-address>BUSINESS_ADDRESS</span></li>
        <li><strong>Politique de remboursement :</strong> Évaluée au cas par cas par email.</li>
      </ul>

      <h2>6. Ressources et propriété intellectuelle</h2>
      <p>Tous les supports (notes, fiches, vidéos, explications) sont réservés à un usage académique personnel. Toute redistribution ou revente est interdite.</p>

      <h2>7. Confidentialité</h2>
      <p>Les données sont traitées selon la Politique de confidentialité. En utilisant le Tableau de bord, vous acceptez ces pratiques.</p>

      <h2>8. Limitation de responsabilité</h2>
      <p>Le Tableau de bord est fourni « en l’état ». Je ne suis pas responsable des pannes internet, des services tiers, des appareils ou des résultats académiques.</p>

      <h2>9. Résiliation</h2>
      <p>L’accès peut être restreint en cas de violation ou à la fin du tutorat. Vous pouvez demander la suppression du compte.</p>

      <h2>10. Principes directeurs</h2>
      <p>Ces conditions reflètent les standards usuels de tutorat privé et de gestion des données, sans juridiction spécifique.</p>

      <h2>11. Contact</h2>
      <p>Questions sur ces conditions : <strong data-support-email>SUPPORT_EMAIL</strong></p>
    `,
    zh: `
      <p>本服务条款适用于辅导仪表板（“平台”）及相关辅导服务。访问平台即表示您同意这些条款。</p>

      <h2>1. 资格</h2>
      <p>仅限接受辅导的学生使用。若未满 18 岁，需家长/监护人同意。</p>

      <h2>2. 账户责任</h2>
      <ul>
        <li>请妥善保管登录码，仅用于学习相关目的。</li>
        <li>登录采用验证码流程，不收集或存储密码。</li>
        <li>如怀疑未授权访问，请及时告知。</li>
        <li>不当使用可能导致暂停或移除访问。</li>
      </ul>

      <h2>3. 可接受的使用方式</h2>
      <ul>
        <li>禁止黑客攻击、篡改或干扰平台。</li>
        <li>禁止分享其他学生的数据或资料。</li>
        <li>禁止上传有害文件、脚本或内容。</li>
      </ul>

      <h2>4. 辅导课程</h2>
      <h3>4.1 预约与出勤</h3>
      <p>请按时参加已安排课程，取消或变更请提前合理通知。</p>
      <h3>4.2 取消</h3>
      <p>临近取消可能产生费用；具体规则在预约时说明。</p>

      <h2>5. 付款与发票</h2>
      <h3>5.1 透明度</h3>
      <p>发票可在平台中查看。</p>
      <h3>5.2 付款</h3>
      <p>需在到期日前按约定方式付款。付款由 PayFast 代收商户处理。</p>
      <h3>5.3 逾期付款</h3>
      <p>多次逾期可能产生滞纳费用和/或暂停课程。</p>
      <h3>5.4 服务邮件通知</h3>
      <p>当您提供邮箱并在资料中开启同意后，即授权我们发送服务类邮件通知（包括发票、逾期提醒、课程变更、账户安全通知以及域名/政策更新）。营销邮件需单独明确同意。</p>

      <h2>付款与商户信息</h2>
      <ul>
        <li><strong>收款商户：</strong> <span data-merchant-name>MERCHANT_NAME</span></li>
        <li><strong>支付处理：</strong> PayFast</li>
        <li><strong>运营/服务：</strong> <span data-operator-name>OPERATOR_NAME</span></li>
        <li><strong>联系邮箱：</strong> <span data-support-email>SUPPORT_EMAIL</span></li>
        <li><strong>经营地址：</strong> <span data-business-address>BUSINESS_ADDRESS</span></li>
        <li><strong>退款政策：</strong> 未使用课时的退款将通过邮箱个案处理。</li>
      </ul>

      <h2>6. 资源与知识产权</h2>
      <p>所有资料（笔记、讲义、视频、讲解）仅供个人学习使用，禁止再分发或转售。</p>

      <h2>7. 隐私</h2>
      <p>数据将依据隐私政策处理。使用平台即表示接受这些做法。</p>

      <h2>8. 责任限制</h2>
      <p>平台按“现状”提供。我不对网络故障、第三方服务中断、设备故障或学业结果负责。</p>

      <h2>9. 终止</h2>
      <p>如违反政策、滥用或辅导结束，可限制或终止访问。您可随时申请删除账户。</p>

      <h2>10. 一般原则</h2>
      <p>这些条款符合私人辅导和学生数据管理的通行标准，不依赖特定司法辖区。</p>

      <h2>11. 联系方式</h2>
      <p>有关条款问题：<strong data-support-email>SUPPORT_EMAIL</strong></p>
    `
  };

  const CONTRACT_HTML = {
    en: `
      <div id="status" class="status"></div>
      <div id="studentName" class="muted"></div>
      <h1>Tutoring Services Agreement (Minor Tutor Version)</h1>
      <p class="muted">Please read the full agreement and complete the fields inline. When done, click “Sign & Download PDF”.</p>

      <p>Agreement date: <input class="field-inline" name="date" data-field type="date" required></p>

      <p class="section-title">PARTIES</p>
      <p><span class="inline-label">Tutor's Legal Guardian (Contracting Party):</span><br>
      Name: <input class="field-inline" name="guardian_name" data-field required value="Yu Qin" readonly><br>
      Email: <input class="field-inline" name="guardian_email" data-field type="email" required value="17449125@qq.com" readonly><br>
      Mobile / WhatsApp: <input class="field-inline" name="guardian_phone" data-field value="+27 736696754" readonly></p>

      <p class="section-title">Minor Tutor (Service Provider):</p>
      <p>Name: <input class="field-inline" name="tutor_name" data-field value="Shangjing Huang" readonly><br>
      Age: 16<br>
      Email: <input class="field-inline" name="tutor_email" data-field value="erichuang.shangjing@outlook.com" readonly></p>

      <p class="section-title">Client (Parent/Guardian):</p>
      <p>Name: <input class="field-inline" name="parent_name" data-field required><br>
      Email: <input class="field-inline" name="parent_email" data-field type="email" required><br>
      Mobile / WhatsApp: <input class="field-inline" name="parent_phone" data-field></p>

      <p>For the benefit of the Student:<br>
      Student name: <input class="field-inline" name="student_name" data-field required><br>
      Date of birth: <input class="field-inline" name="student_dob" data-field type="date" required><br>
      School: <input class="field-inline" name="student_school" data-field required></p>

      <p>The Guardian and the Client are the “Parties.” The Guardian contracts on behalf of the Minor Tutor. The Minor Tutor signs only to acknowledge professional expectations; legal rights and obligations under this Agreement are between the Guardian and the Client.</p>

      <p class="section-title">1. DEFINITIONS</p>
      <ul>
        <li>“Student” means the learner receiving tutoring.</li>
        <li>“Session” means a scheduled tutoring lesson (online or in-person).</li>
        <li>“Fees” means the amounts payable by the Client to the Guardian for Services.</li>
        <li>“Services” means the tutoring and related support described in clause 2.</li>
        <li>“Business Day” means a day other than a Saturday, Sunday or South African public holiday.</li>
        <li>“Writing / written” includes email and WhatsApp messages.</li>
      </ul>

      <p class="section-title">2. SCOPE OF SERVICES</p>
      <p>The Minor Tutor will provide academic tutoring in Maths, Physics, Chemistry including: explaining concepts, exam prep, practice questions, and study skills. The Tutor does not guarantee specific marks or provide other professional services.</p>

      <p class="section-title">3. LESSON FORMAT & LOCATION</p>
      <p>Sessions may be online or in-person (Student home at <input class="field-inline" name="address" data-field> or mutually agreed location). Client ensures a safe environment and adult presence for in-person; suitable device/internet for online.</p>

      <p class="section-title">4. SCHEDULE, ATTENDANCE & PUNCTUALITY</p>
      <p>Sessions are scheduled according to the weekly slots agreed for the Student (one or more slots per week). Session length may vary by slot and is recorded in the schedule. If the Tutor is late, time is extended/credited; if the Student is late, the Session still ends on time.</p>

      <p class="section-title">5. FEES, INVOICING & PAYMENT</p>
      <p>Standard rate: ZAR 200 per 60-minute Session (pro-rated for longer Sessions). Invoices are issued monthly in advance for Sessions scheduled from the earliest upcoming slot after contract signing until the last available slot before month end. Payment is required before Sessions take place; sessions are scheduled only after payment is received. If payment is late, Sessions that have already passed are not billed and will not be rescheduled, and the invoice total is reduced accordingly. Payment instructions will be provided on each invoice; reference: Student surname + invoice number.</p>
      <p>If payment is overdue, the Guardian may suspend sessions and may charge a reasonable admin fee for rebooking or additional processing, if applicable and communicated in writing.</p>

      <p class="section-title">6. CANCELLATIONS & RESCHEDULING</p>
      <p>Client requests to cancel or reschedule must be made to the Guardian/Tutor (clients do not change sessions directly in the system). Cancellations with ≥24h notice are refunded for that Session and the lesson is forfeited. &lt;24h notice or no-show: the lesson is forfeited and no refund is issued. Lessons moved within 24 hours are treated as an additional Session: an adjustment invoice is issued and the additional Session is scheduled only after that invoice is paid.</p>

      <p class="section-title">7. HOLIDAYS & EXAM SEASONS</p>
      <p>Schedule confirmed in advance. Prepaid packages valid <input class="field-inline" name="package_months" data-field value="6" readonly> months unless agreed otherwise.</p>

      <p class="section-title">8. ACADEMIC INTEGRITY</p>
      <p>Tutor will not do the Student’s work, take tests, or log into school platforms. Student remains responsible for submissions and honesty policies.</p>

      <p class="section-title">9. RESPONSIBILITIES OF MINOR TUTOR</p>
      <p>Prepare/deliver sessions with care; tailor explanations; inform of concerns; maintain boundaries; comply with law under Guardian supervision.</p>

      <p class="section-title">10. RESPONSIBILITIES OF STUDENT & PARENT</p>
      <p>Student attends on time, completes work, behaves respectfully. Parent ensures attendance, safe environment, device/internet, updates on relevant changes, pays fees on time.</p>

      <p class="section-title">11. SAFEGUARDING</p>
      <p>Tutor keeps professional boundaries; no unsafe meetings or social media connections; Parent supervises Student. Guardian may report risk of harm.</p>

      <p class="section-title">12. DATA PROTECTION</p>
      <p>Guardian processes personal info for tutoring, scheduling, progress, invoicing, compliance. Data may be stored with third-party tools (inside/outside SA). Parent consents and is authorized for the Student. Data requests should be sent to the Guardian at 17449125@qq.com.</p>

      <p class="section-title">13. CONFIDENTIALITY & IP</p>
      <p>Tutor keeps academic info confidential (except law/safety/consent). Teaching materials remain Tutor IP; personal study use only.</p>

      <p class="section-title">14. ONLINE LESSONS & LOAD-SHEDDING</p>
      <p>Online depends on third parties. If >50% lost due to Tutor side, reschedule/credit. Loss on Client side not obliged to reschedule.</p>

      <p class="section-title">15. GROUP LESSONS (IF APPLICABLE)</p>
      <p>Fees may be per student/group; cancellation by one does not cancel for others.</p>

      <p class="section-title">16. MARKETING</p>
      <p>No public use of student name/photo without permission; anonymised examples only with consent.</p>

      <p class="section-title">17. RATE CHANGES</p>
      <p>Tutor will notify at least 30 days before any rate change.</p>

      <p class="section-title">18. FORCE MAJEURE</p>
      <p>No liability for uncontrollable events; obligations paused; reschedule in good faith.</p>

      <p class="section-title">19. LIMITATION OF LIABILITY</p>
      <p>Care and skill but no guaranteed result. Liability limited to fees paid in prior 3 months; excludes indirect loss; not excluding death/personal injury by negligence.</p>

      <p class="section-title">20. LESSON MATERIALS & RESOURCE USE</p>
      <p>Any notes, worksheets, explanations, recordings (if permitted), or digital resources shared through the dashboard are for the Student's personal learning use only. The Client and Student may not resell, publish, or distribute these materials without prior written permission.</p>

      <p class="section-title">21. SESSION RECORDINGS & COMMUNICATIONS</p>
      <p>No session will be recorded without prior written consent from the Client. Routine communication may occur by WhatsApp, email, or the dashboard.</p>

      <p class="section-title">22. HEALTH, SAFETY & CONDUCT</p>
      <p>The Client must inform the Guardian of any illness, injury, or special needs. The Guardian may reschedule in-person sessions if the environment is unsafe or appropriate supervision is not available.</p>

      <p class="section-title">23. SUBSTITUTE TUTOR (IF REQUIRED)</p>
      <p>If the Minor Tutor is unavailable for an extended period, the Guardian may propose a substitute tutor. The Client may accept or decline without penalty.</p>

      <p class="section-title">24. COMPLAINTS & FEEDBACK</p>
      <p>The Client may raise concerns in writing. The Guardian will respond in good faith within a reasonable time.</p>

      <p class="section-title">25. DATA RETENTION</p>
      <p>Session records, invoices, and signed contract records will be retained for a reasonable period for operational and legal purposes. Records may be retained for up to 5 years for accounting and legal compliance, unless a longer period is required by law, after which they are securely deleted.</p>

      <p class="section-title">26. TERM & TERMINATION</p>
      <p>This Agreement starts on the date stated above and continues until terminated. Either Party may terminate with 30 days’ written notice. The Guardian may terminate immediately for non‑payment or serious breach. On termination, outstanding fees remain due; prepaid sessions not yet delivered will be refunded or credited, less any sessions already delivered and any valid charges.</p>

      <p class="section-title">27. NOTICES & COMMUNICATION</p>
      <p>Formal notices may be sent by email or WhatsApp to the contact details above. A notice is deemed received when delivered or sent (same day before 20:00, otherwise next Business Day).</p>

      <p class="section-title">28. GOVERNING LAW & DISPUTE RESOLUTION</p>
      <p>This Agreement is governed by the laws of the Republic of South Africa. Parties will attempt to resolve disputes amicably before legal action.</p>

      <p class="section-title">29. GENERAL</p>
      <p>This Agreement contains the entire understanding between the Parties and supersedes prior agreements. Changes must be in Writing and agreed by both Parties. If any provision is invalid, the remainder stays effective. The Agreement may be signed electronically.</p>

      <p class="section-title">30. ELECTRONIC SIGNATURES & ONLINE DASHBOARD ACCEPTANCE</p>
      <p>By clicking “Sign & Download PDF”, the Client confirms an electronic signature under the ECTA. Electronic signatures have the same force as handwritten signatures.</p>

      <p class="section-title">31. SYSTEM STATUS & STUDENT DASHBOARD VALIDITY</p>
      <p>The Student’s dashboard may show “INVALID - CONTRACT NOT SIGNED” until this Agreement is signed. Once signed, the system status becomes valid. If the Agreement is terminated or materially breached, access may be restricted.</p>

      <p class="section-title">SIGNATURES</p>
      <p>Tutor's Legal Guardian (Contracting Party)<br>
      Signature: <input class="field-inline" name="guardian_signature" data-field value="Yu Qin" readonly><br>
      Name: <input class="field-inline" name="guardian_signature_name" data-field value="Yu Qin" readonly><br>
      Date: <input class="field-inline" name="guardian_signature_date" data-field type="date" required></p>

      <p>Parent/Guardian (Client)<br>
      Signature: <input class="field-inline" name="parent_signature" data-field required><br>
      Name: <input class="field-inline" name="parent_signature_name" data-field required><br>
      Relationship to Student: <input class="field-inline" name="relationship" data-field required><br>
      Date: <input class="field-inline" name="parent_signature_date" data-field type="date" required></p>

      <p>Minor Tutor (Acknowledgement Only)<br>
      Signature: <input class="field-inline" name="tutor_signature" data-field value="Shangjing Huang" readonly><br>
      Name: <input class="field-inline" name="tutor_signature_name" data-field value="Shangjing Huang" readonly><br>
      Date: <input class="field-inline" name="tutor_signature_date" data-field type="date" required></p>

      <div class="mt-3">
        <label class="inline-label">Type your full name as signature</label><br>
        <input class="block-field" name="signature_text" data-field required>
      </div>
      <div class="mt-3">
        <button type="submit" id="signBtn">Sign & Download PDF</button>
      </div>
    `,
    es: `
      <div class="muted" style="margin-bottom:8px;">Nota: En caso de discrepancias, prevalece la versión en inglés.</div>
      <div id="status" class="status"></div>
      <div id="studentName" class="muted"></div>
      <h1>Acuerdo de servicios de tutoría (versión tutor menor)</h1>
      <p class="muted">Lea el acuerdo completo y complete los campos en línea. Cuando termine, haga clic en “Firmar y descargar PDF”.</p>

      <p>Fecha del acuerdo: <input class="field-inline" name="date" data-field type="date" required></p>

      <p class="section-title">PARTES</p>
      <p><span class="inline-label">Tutor legal (parte contratante):</span><br>
      Nombre: <input class="field-inline" name="guardian_name" data-field required value="Yu Qin" readonly><br>
      Email: <input class="field-inline" name="guardian_email" data-field type="email" required value="17449125@qq.com" readonly><br>
      Móvil / WhatsApp: <input class="field-inline" name="guardian_phone" data-field value="+27 736696754" readonly></p>

      <p class="section-title">Tutor menor (proveedor del servicio):</p>
      <p>Nombre: <input class="field-inline" name="tutor_name" data-field value="Shangjing Huang" readonly><br>
      Edad: 16<br>
      Email: <input class="field-inline" name="tutor_email" data-field value="erichuang.shangjing@outlook.com" readonly></p>

      <p class="section-title">Cliente (padre/madre o tutor):</p>
      <p>Nombre: <input class="field-inline" name="parent_name" data-field required><br>
      Email: <input class="field-inline" name="parent_email" data-field type="email" required><br>
      Móvil / WhatsApp: <input class="field-inline" name="parent_phone" data-field></p>

      <p>En beneficio del estudiante:<br>
      Nombre del estudiante: <input class="field-inline" name="student_name" data-field required><br>
      Fecha de nacimiento: <input class="field-inline" name="student_dob" data-field type="date" required><br>
      Escuela: <input class="field-inline" name="student_school" data-field required></p>

      <p>El tutor legal y el cliente son las “Partes”. El tutor legal contrata en nombre del tutor menor. El tutor menor firma solo para reconocer expectativas profesionales; los derechos y obligaciones legales de este acuerdo son entre el tutor legal y el cliente.</p>

      <p class="section-title">1. DEFINICIONES</p>
      <ul>
        <li>“Estudiante” significa el alumno que recibe tutoría.</li>
        <li>“Sesión” significa una clase de tutoría programada (en línea o presencial).</li>
        <li>“Honorarios” son los importes pagaderos por el cliente al tutor legal.</li>
        <li>“Servicios” son la tutoría y apoyo descritos en la cláusula 2.</li>
        <li>“Día hábil” significa un día distinto a sábado, domingo o festivo en Sudáfrica.</li>
        <li>“Escrito” incluye correo electrónico y WhatsApp.</li>
      </ul>

      <p class="section-title">2. ALCANCE DE LOS SERVICIOS</p>
      <p>El tutor menor brindará tutoría académica en Matemáticas, Física, Química: explicación de conceptos, preparación de exámenes, práctica y estrategias de estudio. No garantiza calificaciones específicas ni presta otros servicios profesionales.</p>

      <p class="section-title">3. FORMATO Y LUGAR DE LAS CLASES</p>
      <p>Las sesiones pueden ser en línea o presenciales (casa del estudiante en <input class="field-inline" name="address" data-field> u otro lugar acordado). El cliente garantiza un entorno seguro y supervisión adulta para sesiones presenciales y un dispositivo/internet adecuados para sesiones en línea.</p>

      <p class="section-title">4. HORARIO, ASISTENCIA Y PUNTUALIDAD</p>
      <p>Las sesiones se programan según los horarios semanales acordados (uno o más por semana). La duración puede variar y se registra en el horario. Si el tutor llega tarde, se extiende o acredita el tiempo; si el estudiante llega tarde, la sesión termina a la hora prevista.</p>

      <p class="section-title">5. HONORARIOS, FACTURACIÓN Y PAGO</p>
      <p>Tarifa estándar: ZAR 200 por sesión de 60 minutos (prorrateado para sesiones más largas). Las facturas se emiten mensualmente por adelantado para las sesiones programadas desde la primera sesión posterior a la firma hasta el fin de mes. El pago es obligatorio antes de la sesión; las sesiones se programan solo tras recibir el pago. Si el pago es tardío, las sesiones ya pasadas no se facturan ni se reprograman, y el total se reduce. Instrucciones de pago en cada factura; referencia: apellido del estudiante + número de factura.</p>
      <p>Si el pago está vencido, el tutor legal puede suspender sesiones y aplicar una tarifa administrativa razonable, si se comunica por escrito.</p>

      <p class="section-title">6. CANCELACIONES Y REPROGRAMACIONES</p>
      <p>Las solicitudes deben hacerse al tutor legal (los clientes no cambian sesiones en el sistema). Cancelaciones con ≥24h se reembolsan y la clase se pierde. &lt;24h o inasistencia: la clase se pierde y no hay reembolso. Movimientos dentro de 24h se tratan como sesión adicional: se emite factura de ajuste y la sesión adicional solo se programa tras el pago.</p>

      <p class="section-title">7. VACACIONES Y ÉPOCAS DE EXÁMENES</p>
      <p>El horario se confirma por adelantado. Paquetes prepagos válidos por <input class="field-inline" name="package_months" data-field value="6" readonly> meses salvo acuerdo distinto.</p>

      <p class="section-title">8. INTEGRIDAD ACADÉMICA</p>
      <p>El tutor no hará el trabajo del estudiante ni tomará exámenes en su lugar. El estudiante es responsable de sus entregas y normas de honestidad.</p>

      <p class="section-title">9. RESPONSABILIDADES DEL TUTOR MENOR</p>
      <p>Preparar y brindar sesiones con cuidado; adaptar explicaciones; informar inquietudes; mantener límites; cumplir la ley bajo supervisión del tutor legal.</p>

      <p class="section-title">10. RESPONSABILIDADES DEL ESTUDIANTE Y DEL PADRE/MADRE</p>
      <p>El estudiante asiste puntual, realiza tareas y se comporta con respeto. El padre/madre garantiza asistencia, entorno seguro, dispositivo/internet, comunica cambios relevantes y paga puntualmente.</p>

      <p class="section-title">11. PROTECCIÓN</p>
      <p>El tutor mantiene límites profesionales; no reuniones inseguras ni redes sociales. El padre/madre supervisa al estudiante. El tutor legal puede reportar riesgos de daño.</p>

      <p class="section-title">12. PROTECCIÓN DE DATOS</p>
      <p>El tutor legal procesa datos personales para tutoría, programación, progreso y facturación. Los datos pueden almacenarse en herramientas de terceros dentro o fuera de Sudáfrica. El cliente consiente y está autorizado para el estudiante. Solicitudes de datos a 17449125@qq.com.</p>

      <p class="section-title">13. CONFIDENCIALIDAD Y PROPIEDAD INTELECTUAL</p>
      <p>La información académica es confidencial salvo ley/seguridad/consentimiento. Los materiales son propiedad del tutor y son solo para uso personal.</p>

      <p class="section-title">14. CLASES EN LÍNEA Y CORTES DE ENERGÍA</p>
      <p>Las clases en línea dependen de terceros. Si se pierde >50% por el tutor, se reprograma o acredita. Si la pérdida es del cliente, no es obligatorio reprogramar.</p>

      <p class="section-title">15. CLASES GRUPALES (SI APLICA)</p>
      <p>Las tarifas pueden ser por alumno o grupo; la cancelación de un alumno no cancela la clase para los demás.</p>

      <p class="section-title">16. MARKETING</p>
      <p>No se usa el nombre/foto del estudiante en marketing público sin permiso; ejemplos anónimos solo con consentimiento.</p>

      <p class="section-title">17. CAMBIOS DE TARIFA</p>
      <p>Se notificará con al menos 30 días de anticipación cualquier cambio de tarifa.</p>

      <p class="section-title">18. FUERZA MAYOR</p>
      <p>No hay responsabilidad por eventos fuera de control; obligaciones suspendidas y reprogramación de buena fe.</p>

      <p class="section-title">19. LIMITACIÓN DE RESPONSABILIDAD</p>
      <p>Se presta el servicio con cuidado, sin garantizar resultados. La responsabilidad se limita a las tarifas pagadas en los 3 meses anteriores.</p>

      <p class="section-title">20. MATERIALES Y RECURSOS</p>
      <p>Las notas y recursos compartidos son solo para uso personal del estudiante. No se pueden revender ni distribuir sin permiso escrito.</p>

      <p class="section-title">21. GRABACIONES Y COMUNICACIONES</p>
      <p>No se grabará ninguna sesión sin consentimiento escrito. Las comunicaciones pueden ser por WhatsApp, email o el panel.</p>

      <p class="section-title">22. SALUD, SEGURIDAD Y CONDUCTA</p>
      <p>El cliente debe informar de enfermedades o necesidades especiales. El tutor legal puede reprogramar si el entorno no es seguro o no hay supervisión adecuada.</p>

      <p class="section-title">23. TUTOR SUSTITUTO</p>
      <p>Si el tutor menor no está disponible por un periodo largo, el tutor legal puede proponer un sustituto. El cliente puede aceptar o rechazar sin penalidad.</p>

      <p class="section-title">24. QUEJAS Y COMENTARIOS</p>
      <p>El cliente puede plantear inquietudes por escrito. El tutor legal responderá de buena fe en un plazo razonable.</p>

      <p class="section-title">25. RETENCIÓN DE DATOS</p>
      <p>Registros de sesiones, facturas y contratos se conservan hasta 5 años por razones legales y contables, salvo que la ley exija más tiempo.</p>

      <p class="section-title">26. DURACIÓN Y TERMINACIÓN</p>
      <p>El acuerdo inicia en la fecha indicada y continúa hasta su terminación. Cualquiera puede terminar con 30 días de aviso. El tutor legal puede terminar de inmediato por impago o incumplimiento grave. Al terminar, las tarifas pendientes siguen siendo exigibles.</p>

      <p class="section-title">27. NOTIFICACIONES</p>
      <p>Las notificaciones pueden enviarse por email o WhatsApp y se consideran recibidas cuando se entregan o envían dentro del horario indicado.</p>

      <p class="section-title">28. LEY APLICABLE Y RESOLUCIÓN DE DISPUTAS</p>
      <p>Este acuerdo se rige por las leyes de Sudáfrica. Las partes intentarán resolver disputas amistosamente antes de acciones legales.</p>

      <p class="section-title">29. GENERAL</p>
      <p>Este acuerdo contiene el entendimiento completo y sustituye acuerdos previos. Los cambios deben ser por escrito. Si alguna disposición es inválida, el resto sigue vigente. Puede firmarse electrónicamente.</p>

      <p class="section-title">30. FIRMAS ELECTRÓNICAS</p>
      <p>Al hacer clic en “Firmar y descargar PDF”, el cliente confirma una firma electrónica válida según la ECTA.</p>

      <p class="section-title">31. ESTADO DEL SISTEMA</p>
      <p>El panel del estudiante puede mostrar “INVÁLIDO - CONTRATO NO FIRMADO” hasta que se firme. Luego el estado pasa a válido. Si se termina el acuerdo, el acceso puede restringirse.</p>

      <p class="section-title">FIRMAS</p>
      <p>Tutor legal (parte contratante)<br>
      Firma: <input class="field-inline" name="guardian_signature" data-field value="Yu Qin" readonly><br>
      Nombre: <input class="field-inline" name="guardian_signature_name" data-field value="Yu Qin" readonly><br>
      Fecha: <input class="field-inline" name="guardian_signature_date" data-field type="date" required></p>

      <p>Padre/madre (cliente)<br>
      Firma: <input class="field-inline" name="parent_signature" data-field required><br>
      Nombre: <input class="field-inline" name="parent_signature_name" data-field required><br>
      Relación con el estudiante: <input class="field-inline" name="relationship" data-field required><br>
      Fecha: <input class="field-inline" name="parent_signature_date" data-field type="date" required></p>

      <p>Tutor menor (solo reconocimiento)<br>
      Firma: <input class="field-inline" name="tutor_signature" data-field value="Shangjing Huang" readonly><br>
      Nombre: <input class="field-inline" name="tutor_signature_name" data-field value="Shangjing Huang" readonly><br>
      Fecha: <input class="field-inline" name="tutor_signature_date" data-field type="date" required></p>

      <div class="mt-3">
        <label class="inline-label">Escriba su nombre completo como firma</label><br>
        <input class="block-field" name="signature_text" data-field required>
      </div>
      <div class="mt-3">
        <button type="submit" id="signBtn">Firmar y descargar PDF</button>
      </div>
    `,
    fr: `
      <div class="muted" style="margin-bottom:8px;">Note : en cas de divergence, la version anglaise prévaut.</div>
      <div id="status" class="status"></div>
      <div id="studentName" class="muted"></div>
      <h1>Contrat de services de tutorat (version tuteur mineur)</h1>
      <p class="muted">Veuillez lire l’accord et compléter les champs en ligne. Ensuite, cliquez sur « Signer et télécharger le PDF ».</p>

      <p>Date de l’accord : <input class="field-inline" name="date" data-field type="date" required></p>

      <p class="section-title">PARTIES</p>
      <p><span class="inline-label">Tuteur légal (partie contractante) :</span><br>
      Nom : <input class="field-inline" name="guardian_name" data-field required value="Yu Qin" readonly><br>
      Email : <input class="field-inline" name="guardian_email" data-field type="email" required value="17449125@qq.com" readonly><br>
      Mobile / WhatsApp : <input class="field-inline" name="guardian_phone" data-field value="+27 736696754" readonly></p>

      <p class="section-title">Tuteur mineur (prestataire) :</p>
      <p>Nom : <input class="field-inline" name="tutor_name" data-field value="Shangjing Huang" readonly><br>
      Âge : 16<br>
      Email : <input class="field-inline" name="tutor_email" data-field value="erichuang.shangjing@outlook.com" readonly></p>

      <p class="section-title">Client (parent/tuteur) :</p>
      <p>Nom : <input class="field-inline" name="parent_name" data-field required><br>
      Email : <input class="field-inline" name="parent_email" data-field type="email" required><br>
      Mobile / WhatsApp : <input class="field-inline" name="parent_phone" data-field></p>

      <p>Au bénéfice de l’élève :<br>
      Nom de l’élève : <input class="field-inline" name="student_name" data-field required><br>
      Date de naissance : <input class="field-inline" name="student_dob" data-field type="date" required><br>
      École : <input class="field-inline" name="student_school" data-field required></p>

      <p>Le tuteur légal et le client sont les « Parties ». Le tuteur légal contracte au nom du tuteur mineur. Le tuteur mineur signe uniquement pour reconnaître les attentes professionnelles ; les droits et obligations juridiques relèvent du tuteur légal et du client.</p>

      <p class="section-title">1. DÉFINITIONS</p>
      <ul>
        <li>« Élève » : l’apprenant recevant le tutorat.</li>
        <li>« Séance » : un cours planifié (en ligne ou en présentiel).</li>
        <li>« Honoraires » : montants payables par le client au tuteur légal.</li>
        <li>« Services » : tutorat et soutien décrits à l’article 2.</li>
        <li>« Jour ouvrable » : tout jour autre que samedi, dimanche ou jour férié en Afrique du Sud.</li>
        <li>« Écrit » inclut email et WhatsApp.</li>
      </ul>

      <p class="section-title">2. PORTÉE DES SERVICES</p>
      <p>Le tuteur mineur fournit du tutorat en maths, physique et chimie : explications, préparation d’examens, exercices et stratégies d’étude. Aucun résultat garanti.</p>

      <p class="section-title">3. FORMAT ET LIEU</p>
      <p>Les séances peuvent être en ligne ou en présentiel (domicile de l’élève à <input class="field-inline" name="address" data-field> ou autre lieu convenu). Le client assure un environnement sûr et une supervision adulte en présentiel, ainsi qu’un matériel/internet adaptés en ligne.</p>

      <p class="section-title">4. PLANNING, ASSIDUITÉ ET PONCTUALITÉ</p>
      <p>Les séances suivent les créneaux hebdomadaires convenus. La durée peut varier. Si le tuteur est en retard, le temps est rattrapé ou crédité ; si l’élève est en retard, la séance se termine à l’heure prévue.</p>

      <p class="section-title">5. HONORAIRES, FACTURATION ET PAIEMENT</p>
      <p>Tarif standard : ZAR 200 par séance de 60 minutes (au prorata). Les factures sont émises mensuellement à l’avance pour les séances planifiées. Le paiement est requis avant les séances. En cas de retard, les séances passées ne sont pas facturées ni reprogrammées, et le total est ajusté.</p>
      <p>En cas de retard de paiement, le tuteur légal peut suspendre les séances et appliquer des frais administratifs raisonnables, communiqués par écrit.</p>

      <p class="section-title">6. ANNULATIONS ET REPROGRAMMATIONS</p>
      <p>Les demandes doivent être adressées au tuteur légal. Annulation ≥24h : remboursement de la séance et séance perdue. &lt;24h ou absence : séance perdue sans remboursement. Déplacement à moins de 24h : traité comme séance supplémentaire avec facture d’ajustement et planification après paiement.</p>

      <p class="section-title">7. VACANCES ET PÉRIODES D’EXAMEN</p>
      <p>Le planning est confirmé à l’avance. Les forfaits prépayés sont valides <input class="field-inline" name="package_months" data-field value="6" readonly> mois sauf accord contraire.</p>

      <p class="section-title">8. INTÉGRITÉ ACADÉMIQUE</p>
      <p>Le tuteur n’effectue pas le travail de l’élève ni les évaluations. L’élève reste responsable de ses devoirs et de l’honnêteté académique.</p>

      <p class="section-title">9. RESPONSABILITÉS DU TUTEUR MINEUR</p>
      <p>Préparer et fournir les séances avec soin ; adapter les explications ; signaler les préoccupations ; maintenir des limites ; respecter la loi sous supervision du tuteur légal.</p>

      <p class="section-title">10. RESPONSABILITÉS DE L’ÉLÈVE ET DU PARENT</p>
      <p>L’élève assiste à l’heure, fait les devoirs et se comporte correctement. Le parent assure la présence, un environnement sûr, un accès adéquat et le paiement à temps.</p>

      <p class="section-title">11. PROTECTION</p>
      <p>Le tuteur respecte des limites professionnelles ; pas de rencontres non sûres. Le parent supervise l’élève. Le tuteur légal peut signaler un risque de préjudice.</p>

      <p class="section-title">12. PROTECTION DES DONNÉES</p>
      <p>Le tuteur légal traite les informations personnelles pour le tutorat, la planification, le suivi et la facturation. Les données peuvent être stockées chez des prestataires tiers. Demandes à 17449125@qq.com.</p>

      <p class="section-title">13. CONFIDENTIALITÉ & PROPRIÉTÉ INTELLECTUELLE</p>
      <p>Les informations académiques restent confidentielles sauf obligation légale. Les supports restent la propriété du tuteur ; usage personnel uniquement.</p>

      <p class="section-title">14. COURS EN LIGNE & DÉLESTAGE</p>
      <p>Les cours en ligne dépendent de tiers. Si >50% perdu côté tuteur, reprogrammation/crédit ; côté client, pas d’obligation de reprogrammer.</p>

      <p class="section-title">15. COURS EN GROUPE (SI APPLICABLE)</p>
      <p>Les honoraires peuvent être par élève ou par groupe ; l’annulation d’un élève n’annule pas la séance pour les autres.</p>

      <p class="section-title">16. MARKETING</p>
      <p>Aucune utilisation publique du nom/photo de l’élève sans autorisation ; exemples anonymisés uniquement avec consentement.</p>

      <p class="section-title">17. CHANGEMENTS DE TARIF</p>
      <p>Tout changement de tarif sera communiqué au moins 30 jours à l’avance.</p>

      <p class="section-title">18. FORCE MAJEURE</p>
      <p>Aucune responsabilité pour événements incontrôlables ; obligations suspendues et reprogrammation de bonne foi.</p>

      <p class="section-title">19. LIMITATION DE RESPONSABILITÉ</p>
      <p>Le service est fourni avec soin, sans garantie de résultat. La responsabilité est limitée aux honoraires payés au cours des 3 derniers mois.</p>

      <p class="section-title">20. MATÉRIAUX ET RESSOURCES</p>
      <p>Les supports partagés sont réservés à l’usage personnel de l’élève. Revente ou distribution interdites sans autorisation écrite.</p>

      <p class="section-title">21. ENREGISTREMENTS & COMMUNICATIONS</p>
      <p>Aucune séance ne sera enregistrée sans consentement écrit. La communication peut se faire via WhatsApp, email ou tableau de bord.</p>

      <p class="section-title">22. SANTÉ, SÉCURITÉ ET CONDUITE</p>
      <p>Le client doit informer de toute condition particulière. Le tuteur légal peut reprogrammer si l’environnement n’est pas sûr.</p>

      <p class="section-title">23. TUTEUR DE REMPLACEMENT</p>
      <p>En cas d’indisponibilité prolongée, un remplacement peut être proposé. Le client peut accepter ou refuser sans pénalité.</p>

      <p class="section-title">24. PLAINTES & RETOURS</p>
      <p>Le client peut signaler des préoccupations par écrit. Le tuteur légal répondra de bonne foi dans un délai raisonnable.</p>

      <p class="section-title">25. CONSERVATION DES DONNÉES</p>
      <p>Les registres peuvent être conservés jusqu’à 5 ans pour conformité légale/ comptable.</p>

      <p class="section-title">26. DURÉE & RÉSILIATION</p>
      <p>Le contrat commence à la date ci‑dessus. Résiliation avec préavis de 30 jours. Résiliation immédiate possible en cas de non‑paiement ou violation grave.</p>

      <p class="section-title">27. NOTIFICATIONS</p>
      <p>Les notifications peuvent être envoyées par email ou WhatsApp et sont réputées reçues selon les règles indiquées.</p>

      <p class="section-title">28. LOI APPLICABLE & RÈGLEMENT DES LITIGES</p>
      <p>Le présent accord est régi par les lois d’Afrique du Sud. Les parties tenteront de résoudre amiablement les différends.</p>

      <p class="section-title">29. GÉNÉRAL</p>
      <p>Ce contrat constitue l’intégralité de l’accord. Toute modification doit être écrite. La signature électronique est acceptée.</p>

      <p class="section-title">30. SIGNATURES ÉLECTRONIQUES</p>
      <p>En cliquant sur « Signer et télécharger le PDF », le client consent à une signature électronique.</p>

      <p class="section-title">31. STATUT DU SYSTÈME</p>
      <p>Le tableau de bord peut afficher « INVALIDE - CONTRAT NON SIGNÉ » tant que l’accord n’est pas signé. Ensuite le statut devient valide.</p>

      <p class="section-title">SIGNATURES</p>
      <p>Tuteur légal (partie contractante)<br>
      Signature : <input class="field-inline" name="guardian_signature" data-field value="Yu Qin" readonly><br>
      Nom : <input class="field-inline" name="guardian_signature_name" data-field value="Yu Qin" readonly><br>
      Date : <input class="field-inline" name="guardian_signature_date" data-field type="date" required></p>

      <p>Parent/tuteur (client)<br>
      Signature : <input class="field-inline" name="parent_signature" data-field required><br>
      Nom : <input class="field-inline" name="parent_signature_name" data-field required><br>
      Lien avec l’élève : <input class="field-inline" name="relationship" data-field required><br>
      Date : <input class="field-inline" name="parent_signature_date" data-field type="date" required></p>

      <p>Tuteur mineur (reconnaissance uniquement)<br>
      Signature : <input class="field-inline" name="tutor_signature" data-field value="Shangjing Huang" readonly><br>
      Nom : <input class="field-inline" name="tutor_signature_name" data-field value="Shangjing Huang" readonly><br>
      Date : <input class="field-inline" name="tutor_signature_date" data-field type="date" required></p>

      <div class="mt-3">
        <label class="inline-label">Saisissez votre nom complet comme signature</label><br>
        <input class="block-field" name="signature_text" data-field required>
      </div>
      <div class="mt-3">
        <button type="submit" id="signBtn">Signer et télécharger le PDF</button>
      </div>
    `,
    zh: `
      <div class="muted" style="margin-bottom:8px;">提示：如有任何不一致，以英文版本为准。</div>
      <div id="status" class="status"></div>
      <div id="studentName" class="muted"></div>
      <h1>辅导服务协议（未成年导师版本）</h1>
      <p class="muted">请阅读完整协议并填写内嵌字段。完成后点击“签署并下载 PDF”。</p>

      <p>协议日期：<input class="field-inline" name="date" data-field type="date" required></p>

      <p class="section-title">当事人</p>
      <p><span class="inline-label">导师法定监护人（签约方）：</span><br>
      姓名：<input class="field-inline" name="guardian_name" data-field required value="Yu Qin" readonly><br>
      邮箱：<input class="field-inline" name="guardian_email" data-field type="email" required value="17449125@qq.com" readonly><br>
      手机/WhatsApp：<input class="field-inline" name="guardian_phone" data-field value="+27 736696754" readonly></p>

      <p class="section-title">未成年导师（服务提供者）：</p>
      <p>姓名：<input class="field-inline" name="tutor_name" data-field value="Shangjing Huang" readonly><br>
      年龄：16<br>
      邮箱：<input class="field-inline" name="tutor_email" data-field value="erichuang.shangjing@outlook.com" readonly></p>

      <p class="section-title">客户（家长/监护人）：</p>
      <p>姓名：<input class="field-inline" name="parent_name" data-field required><br>
      邮箱：<input class="field-inline" name="parent_email" data-field type="email" required><br>
      手机/WhatsApp：<input class="field-inline" name="parent_phone" data-field></p>

      <p>为该学生提供服务：<br>
      学生姓名：<input class="field-inline" name="student_name" data-field required><br>
      出生日期：<input class="field-inline" name="student_dob" data-field type="date" required><br>
      学校：<input class="field-inline" name="student_school" data-field required></p>

      <p>监护人与客户为“当事人”。监护人代表未成年导师签订本协议。未成年导师仅签署以确认专业期望；本协议的法律权利义务由监护人与客户承担。</p>

      <p class="section-title">1. 定义</p>
      <ul>
        <li>“学生”指接受辅导的学习者。</li>
        <li>“课程”指已安排的辅导课（线上或线下）。</li>
        <li>“费用”指客户应向监护人支付的金额。</li>
        <li>“服务”指第 2 条所述辅导与支持。</li>
        <li>“工作日”指非周六、周日或南非公共假日的日期。</li>
        <li>“书面”包括邮件与 WhatsApp 消息。</li>
      </ul>

      <p class="section-title">2. 服务范围</p>
      <p>未成年导师提供数学、物理、化学等学科辅导：概念讲解、考试准备、练习与学习策略。导师不保证具体成绩，也不提供其他专业服务。</p>

      <p class="section-title">3. 课程形式与地点</p>
      <p>课程可线上或线下（学生家中：<input class="field-inline" name="address" data-field> 或双方同意地点）。客户需确保线下安全环境与成人监督；线上需具备设备与稳定网络。</p>

      <p class="section-title">4. 课程安排、出勤与准时</p>
      <p>课程依据约定的每周时间安排（每周一个或多个时段）。课程时长可能不同并记录在日程中。导师迟到则延长或补偿；学生迟到则课程仍按预定时间结束。</p>

      <p class="section-title">5. 费用、开票与支付</p>
      <p>标准费率：每 60 分钟 ZAR 200（更长课程按比例计算）。每月提前开票，覆盖签约后至月底的已安排课程。必须在课程开始前付款；付款后才安排课程。若付款延迟，已过期课程不计费也不补课，发票总额相应减少。付款说明在每张发票中提供。</p>
      <p>如逾期付款，监护人可暂停课程，并可收取合理管理费（如适用且书面说明）。</p>

      <p class="section-title">6. 取消与改期</p>
      <p>取消或改期须联系监护人/导师（客户不能直接在系统中更改）。≥24 小时取消：该课退款且课程作废。<24 小时或缺席：课程作废且不退款。24 小时内改期视为额外课程：开具调整发票，付费后才安排。</p>

      <p class="section-title">7. 假期与考试季</p>
      <p>日程提前确认。预付套餐有效期 <input class="field-inline" name="package_months" data-field value="6" readonly> 个月，除非另有约定。</p>

      <p class="section-title">8. 学术诚信</p>
      <p>导师不代写作业、代考或代登录学校平台。学生对作业提交和诚信规范负责。</p>

      <p class="section-title">9. 未成年导师责任</p>
      <p>认真备课授课；尽量因材施教；及时反馈问题；保持专业边界；在监护人监督下遵守法律。</p>

      <p class="section-title">10. 学生与家长责任</p>
      <p>学生按时参加并完成任务，保持尊重。家长确保出勤、环境安全、设备与网络，并按时支付费用。</p>

      <p class="section-title">11. 保护措施</p>
      <p>导师保持专业边界，不进行不安全会面或社交媒体联系。家长监督学生。监护人可依法报告风险。</p>

      <p class="section-title">12. 数据保护</p>
      <p>监护人处理个人信息用于辅导、日程、进度与开票。数据可能存储在第三方工具中（南非境内或境外）。数据请求请发送至 17449125@qq.com。</p>

      <p class="section-title">13. 保密与知识产权</p>
      <p>学业信息保密（除非法律/安全/同意）。教学材料归导师所有，仅供个人学习使用。</p>

      <p class="section-title">14. 线上课程与停电</p>
      <p>线上课程受第三方影响。若导师侧导致损失超过 50%，可补课或抵扣；若客户侧导致损失，导师无义务补课。</p>

      <p class="section-title">15. 小组课程（如适用）</p>
      <p>费用可按学生或小组计费；某一学生取消不影响其他学生课程。</p>

      <p class="section-title">16. 市场推广</p>
      <p>未经许可不得公开使用学生姓名/照片；匿名案例需征得同意。</p>

      <p class="section-title">17. 费率调整</p>
      <p>任何费用调整将至少提前 30 天通知。</p>

      <p class="section-title">18. 不可抗力</p>
      <p>对不可抗力事件不承担责任；义务暂停并善意安排补课。</p>

      <p class="section-title">19. 责任限制</p>
      <p>提供服务但不保证结果。责任限于前 3 个月已支付费用。</p>

      <p class="section-title">20. 资料与资源</p>
      <p>共享资料仅限个人学习使用，未经书面许可不得转售或传播。</p>

      <p class="section-title">21. 录制与沟通</p>
      <p>未经书面同意不录制课程。沟通可通过 WhatsApp、邮箱或平台进行。</p>

      <p class="section-title">22. 健康、安全与行为</p>
      <p>客户需告知特殊健康需求。若环境不安全或监督不足，监护人可调整线下课程。</p>

      <p class="section-title">23. 替代导师</p>
      <p>若未成年导师长期不可用，监护人可建议替代导师。客户可接受或拒绝，不受处罚。</p>

      <p class="section-title">24. 投诉与反馈</p>
      <p>客户可书面反馈问题，监护人将合理时间内答复。</p>

      <p class="section-title">25. 数据保留</p>
      <p>课程记录、发票和合同可能保留最长 5 年用于法律与会计合规。</p>

      <p class="section-title">26. 期限与终止</p>
      <p>协议自上述日期生效。任何一方可提前 30 天书面通知终止。若严重违约或长期不付款，监护人可立即终止。</p>

      <p class="section-title">27. 通知</p>
      <p>正式通知可通过邮件或 WhatsApp 发送，并按约定规则视为送达。</p>

      <p class="section-title">28. 法律适用与争议解决</p>
      <p>本协议受南非法律管辖。双方应先友好协商解决争议。</p>

      <p class="section-title">29. 一般条款</p>
      <p>本协议构成完整约定。变更须书面同意。电子签名有效。</p>

      <p class="section-title">30. 电子签名</p>
      <p>点击“签署并下载 PDF”表示同意电子签名。</p>

      <p class="section-title">31. 系统状态</p>
      <p>在协议签署前，学生平台可能显示“无效-未签署”。签署后状态变为有效；若协议终止，访问可被限制。</p>

      <p class="section-title">签署</p>
      <p>导师法定监护人（签约方）<br>
      签名：<input class="field-inline" name="guardian_signature" data-field value="Yu Qin" readonly><br>
      姓名：<input class="field-inline" name="guardian_signature_name" data-field value="Yu Qin" readonly><br>
      日期：<input class="field-inline" name="guardian_signature_date" data-field type="date" required></p>

      <p>家长/监护人（客户）<br>
      签名：<input class="field-inline" name="parent_signature" data-field required><br>
      姓名：<input class="field-inline" name="parent_signature_name" data-field required><br>
      与学生关系：<input class="field-inline" name="relationship" data-field required><br>
      日期：<input class="field-inline" name="parent_signature_date" data-field type="date" required></p>

      <p>未成年导师（仅确认）<br>
      签名：<input class="field-inline" name="tutor_signature" data-field value="Shangjing Huang" readonly><br>
      姓名：<input class="field-inline" name="tutor_signature_name" data-field value="Shangjing Huang" readonly><br>
      日期：<input class="field-inline" name="tutor_signature_date" data-field type="date" required></p>

      <div class="mt-3">
        <label class="inline-label">请输入全名作为签名</label><br>
        <input class="block-field" name="signature_text" data-field required>
      </div>
      <div class="mt-3">
        <button type="submit" id="signBtn">签署并下载 PDF</button>
      </div>
    `
  };

  window.LEGAL_I18N = { PRIVACY_HTML, TOS_HTML, CONTRACT_HTML };
})();
