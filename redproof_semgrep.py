"""Throwaway file to RED-prove the semgrep gate. Deleted with its branch.

Deliberately NOT a credential: the gitleaks pre-commit hook installed this session would block a
secret before it could ever reach CI, so a secret cannot test the CI gate. This uses a plain
security-audit pattern instead.
"""
import subprocess


def run(user_input):
    # semgrep p/security-audit: subprocess call with shell=True on non-literal input.
    return subprocess.check_output(user_input, shell=True)
