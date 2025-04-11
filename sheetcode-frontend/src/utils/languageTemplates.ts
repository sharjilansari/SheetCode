export const templates: Record<string, (userCode: string) => string> = {
    javascript: (code) => `
      const input = \`$\{require("fs").readFileSync(0, "utf-8")}\`;
      const lines = input.trim().split("\\n");
      ${code}
    `,
    typescript: (code) => `
      const input: string = \`$\{require("fs").readFileSync(0, "utf-8")}\`;
      const lines: string[] = input.trim().split("\\n");
      ${code}
    `,
    python: (code) => `
      import sys
      input = sys.stdin.read
      data = input().splitlines()
      ${code}
    `,
    java: (code) => `
      import java.util.*;
      public class Main {
        public static void main(String[] args) {
          Scanner sc = new Scanner(System.in);
          ${code}
        }
      }
    `,
    c: (code) => `
      #include <stdio.h>
      int main() {
        ${code}
        return 0;
      }
    `,
    cpp: (code) => `
      #include <iostream>
      using namespace std;
      int main() {
        ${code}
        return 0;
      }
    `,
  };
  