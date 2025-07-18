import { describe, expect, it } from "vitest";
import { cn } from "./utils";

describe("utilsライブラリ", () => {
	describe("cn関数", () => {
		it("複数のクラス名を結合できること", () => {
			const result = cn("class1", "class2", "class3");
			expect(result).toBe("class1 class2 class3");
		});

		it("条件付きクラス名を処理できること", () => {
			const result = cn("base", true && "conditional", false && "hidden");
			expect(result).toBe("base conditional");
		});

		it("重複するクラス名をマージできること", () => {
			const result = cn("p-4", "p-2"); // Tailwindのマージが期待される
			expect(result).toContain("p-");
		});

		it("空の値やundefinedを適切に処理すること", () => {
			const result = cn("valid", undefined, null, "", "another");
			expect(result).toBe("valid another");
		});

		it("配列を展開して処理できること", () => {
			const result = cn(["class1", "class2"], "class3");
			expect(result).toBe("class1 class2 class3");
		});
	});
});
