import { WorkflowService } from '@/workflows/workflow.service';
import { WorkflowRepository } from '@n8n/db';

export class CredentialResolverWorkflowService {
	constructor(private readonly workflowRepository: WorkflowRepository) {}

	async getWorkflowStatus(workflowId: string, identityToken: string) {
		const workflow = await this.workflowRepository.get({
			id: workflowId,
		});

		if (!workflow) {
			throw new Error('Workflow not found');
		}

		const resolverId = ''; // Find in workflow.settings!!

		const credentialsToCheck: Array<{ credentialId: string }> = [];

		for (const node of workflow.nodes ?? []) {
			for (const credentialName in node.credentials ?? {}) {
				const credentialData = node.credentials?.[credentialName];
				// Fetch credentials from the DB using the credentialData.id
				if (credentialData?.id) {
					credentialsToCheck.push({ credentialId: credentialData.id });
				}
			}
		}

		// TODO: Get all credentials from the DB based on the ids collected above and resolvable being true

		// Get the resolver for each of them and check status

		return;
	}
}
