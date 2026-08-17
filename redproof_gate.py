"""Throwaway: prove the semgrep gate can FAIL. Deleted with its branch.

Deliberately not a credential — the gitleaks pre-commit gate installed this session would block a
secret before it ever reached CI, so a secret cannot test the CI gate. This is a plain
p/security-audit pattern instead.
"""
import subprocess


def run(user_input):
    return subprocess.check_output(user_input, shell=True)
