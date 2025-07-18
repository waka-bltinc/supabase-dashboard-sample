import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { step } from "@akfm/test-utils";
import { UserManagementCardPresentational } from "./user-management-card-presentational";
import type { User } from "@/lib/users/types";

const mockAdminUser: User = {
	id: "1",
	email: "admin@example.com",
	first_name: "管理者",
	last_name: "ユーザー",
	role: "admin",
	created_at: "2024-01-01T00:00:00Z",
	updated_at: "2024-01-01T00:00:00Z",
};

const mockRegularUser: User = {
	id: "2",
	email: "user@example.com",
	first_name: "一般",
	last_name: "ユーザー",
	role: "user",
	created_at: "2024-01-01T00:00:00Z",
	updated_at: "2024-01-01T00:00:00Z",
};

describe("UserManagementCardPresentational", () => {
	describe("管理者権限のユーザー", () => {
		test(
			"ユーザー管理カードが表示される",
			step({
				arrange: () => ({
					user: mockAdminUser,
					error: null,
				}),
				act: ({ user, error }) => render(<UserManagementCardPresentational user={user} error={error} />),
				assert: () => {
					expect(screen.getByText("ユーザー管理")).toBeInTheDocument();
					expect(screen.getByText("システム内のユーザーを確認・管理できます")).toBeInTheDocument();
					expect(screen.getByText("ユーザー一覧を見る")).toBeInTheDocument();
				},
			}),
		);

		test(
			"ユーザー一覧へのリンクが正しく設定される",
			step({
				arrange: () => ({
					user: mockAdminUser,
					error: null,
				}),
				act: ({ user, error }) => render(<UserManagementCardPresentational user={user} error={error} />),
				assert: () => {
					const link = screen.getByRole("link");
					expect(link).toHaveAttribute("href", "/dashboard/users");
				},
			}),
		);
	});

	describe("モデレーター権限のユーザー", () => {
		test(
			"ユーザー管理カードが表示される",
			step({
				arrange: () => ({
					user: { ...mockAdminUser, role: "moderator" as const },
					error: null,
				}),
				act: ({ user, error }) => render(<UserManagementCardPresentational user={user} error={error} />),
				assert: () => {
					expect(screen.getByText("ユーザー管理")).toBeInTheDocument();
				},
			}),
		);
	});

	describe("一般ユーザー", () => {
		test(
			"ユーザー管理カードが表示されない",
			step({
				arrange: () => ({
					user: mockRegularUser,
					error: null,
				}),
				act: ({ user, error }) => render(<UserManagementCardPresentational user={user} error={error} />),
				assert: () => {
					expect(screen.queryByText("ユーザー管理")).not.toBeInTheDocument();
				},
			}),
		);
	});

	describe("エラー状態", () => {
		test(
			"エラーがある場合は何も表示されない",
			step({
				arrange: () => ({
					user: null,
					error: "テストエラー",
				}),
				act: ({ user, error }) => render(<UserManagementCardPresentational user={user} error={error} />),
				assert: () => {
					expect(screen.queryByText("ユーザー管理")).not.toBeInTheDocument();
				},
			}),
		);

		test(
			"ユーザーがnullの場合は何も表示されない",
			step({
				arrange: () => ({
					user: null,
					error: null,
				}),
				act: ({ user, error }) => render(<UserManagementCardPresentational user={user} error={error} />),
				assert: () => {
					expect(screen.queryByText("ユーザー管理")).not.toBeInTheDocument();
				},
			}),
		);
	});
});