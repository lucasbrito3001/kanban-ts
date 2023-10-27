import { ReactNode } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";

export default function Modal({
	title,
	type,
	textConfirmButton,
	children,
	onCancel,
	formId,
}: {
	title: string;
	type: "NORMAL" | "DELETE";
	textConfirmButton: string;
	children: ReactNode;
	onCancel: () => void;
	formId: string;
}) {
	const BGCOLOR_BY_TYPE = {
		NORMAL: {
			color: "bg-sky-600",
			hover: "hover:bg-sky-800",
		},
		DELETE: {
			color: "bg-red-500",
			hover: "hover:bg-red-700",
		},
	};

	return (
		<div
			className="relative z-10"
			aria-labelledby="modal-title"
			role="dialog"
			aria-modal="true"
		>
			<div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

			<div className="fixed inset-0 z-10 w-screen overflow-y-auto">
				<div className="flex min-h-full justify-center p-4 text-center items-center sm:p-0">
					<div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
						<div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
							<div>
								<div className="mt-3 sm:mt-0 text-left">
									<h3
										className="text-xl font-semibold leading-6 text-gray-900"
										id="modal-title"
									>
										{title}
									</h3>
									<div className="mt-3">{children}</div>
								</div>
							</div>
						</div>
						<div className="bg-gray-100 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
							<button
								type="submit"
								className={`${
									BGCOLOR_BY_TYPE[type].color +
									" " +
									BGCOLOR_BY_TYPE[type].hover
								} transition-all trantision-500 inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto`}
								form={formId}
							>
								{textConfirmButton}
							</button>
							<button
								type="button"
								className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
								onClick={onCancel}
							>
								Cancel
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
