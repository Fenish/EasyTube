export enum VideoEvents {
  get_data = "easytube:get_video_data",
  video_info = "easytube:get_video_info",
  start_download = "easytube:start_download",
  video_blob = "easytube:video_blob",
}

export enum ProgressEvents {
  progress_status = "easytube:progress_status",
  new_progress = "easytube:new_progress",
}
