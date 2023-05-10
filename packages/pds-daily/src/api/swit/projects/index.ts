import type { ProjectListParams } from '../types'

/** /api/project.list?workspace_id=220328004153278J6WI */
export const list = (params: ProjectListParams) => {
  if (!params.workspace_id) throw '`workspace_id` is required.'
  const url = '/api/project.list'
  const paramsFinal = {
    ...params,
  }
  return { url, params: paramsFinal }
}
