import type { User } from "@/lib/users/types";
import { step } from "@akfm/test-utils";
import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { UserProfileCardPresentational } from "./user-profile-card-presentational";

const mockUser: User = {
	id: "1",
	email: "test@example.com",
	first_name: "テスト",
	last_name: "ユーザー",
	role: "admin",
	created_at: "2024-01-01T00:00:00Z",
	updated_at: "2024-01-01T00:00:00Z",
};

describe("UserProfileCardPresentational", () => {
	describe("正常な状態", () => {
		test(
			"ユーザー情報が正しく表示される",
			step({
				arrange: () => ({
					user: mockUser,
					error: null,
				}),
				act: ({ user, error }) =>
					render(<UserProfileCardPresentational user={user} error={error} />),
				assert: () => {
					expect(screen.getByText("プロフィール情報")).toBeInTheDocument();
					expect(screen.getByText("test@example.com")).toBeInTheDocument();
					expect(screen.getByText("テスト ユーザー")).toBeInTheDocument();
					expect(screen.getByText("管理者")).toBeInTheDocument();
				},
			}),
		);

		test(
			"名前がない場合は名前セクションが表示されない",
			step({
				arrange: () => ({
					user: { ...mockUser, first_name: null, last_name: null },
					error: null,
				}),
				act: ({ user, error }) =>
					render(<UserProfileCardPresentational user={user} error={error} />),
				assert: () => {
					expect(screen.getByText("test@example.com")).toBeInTheDocument();
					expect(screen.queryByText("名前")).not.toBeInTheDocument();
				},
			}),
		);

		test(
			"権限に応じて適切なバッジが表示される",
			step({
				arrange: () => ({
					user: { ...mockUser, role: "moderator" as const },
					error: null,
				}),
				act: ({ user, error }) =>
					render(<UserProfileCardPresentational user={user} error={error} />),
				assert: () => {
					expect(screen.getByText("モデレーター")).toBeInTheDocument();
				},
			}),
		);
	});

	describe("エラー状態", () => {
		test(
			"エラーメッセージが表示される",
			step({
				arrange: () => ({
					user: null,
					error: "テストエラー",
				}),
				act: ({ user, error }) =>
					render(<UserProfileCardPresentational user={user} error={error} />),
				assert: () => {
					expect(screen.getByText("テストエラー")).toBeInTheDocument();
					expect(
						screen.queryByText("プロフィール情報"),
					).not.toBeInTheDocument();
				},
			}),
		);

		test(
			"ユーザーがnullの場合デフォルトエラーメッセージが表示される",
			step({
				arrange: () => ({
					user: null,
					error: null,
				}),
				act: ({ user, error }) =>
					render(<UserProfileCardPresentational user={user} error={error} />),
				assert: () => {
					expect(
						screen.getByText("ユーザー情報の取得に失敗しました"),
					).toBeInTheDocument();
				},
			}),
		);
	});
});
