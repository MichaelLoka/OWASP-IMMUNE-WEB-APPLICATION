# OWASP-IMMUNE-WEB-APPLICATION
A secure web application that is immune to some of the OWASP Top 10 2021 vulnerabilities.

### ❖ A01 Broken Access Control
There should be a login system in the application. Also, there should be an
admin page that is restricted from the normal users. The inputs should be
prevented from path traversal attacks as well (in case they’re prone to the
attack).

### ❖ A02 Cryptographic Failures
Any sensitive data that is being sent to the server should be encrypted using
strong cryptographic encryptions. Keys should be hidden from the source
code (hard to apply cryptanalysis for the attacker).

### ❖ A03 Injection
Any data retrieval parameters should be protected from both SQL and XSS
injections.
PROJECT
OWASP IMMUNE WEB APPLICATION
2

### ❖ A04 Insecure Design
Limit false login attempts for each session. If a user tries to enter a wrong
password for more than 3 times or more in 1 minute, they should be restricted
from submitting any more requests for 10 minutes.

### ❖ A05 Security Misconfiguration
Add an insert image facility that accepts only image extensions. Size limitation
should be applied as well.

### ❖ A07 Identification and Authentication Failures
Perform a two-factor authentication for the login system available on the
application. This is applied to ensure that the person who’s trying to access the
account is the one who’s they’re claiming to be. Passwords should be hashed
in the DB.
