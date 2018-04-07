module ApplicationHelper
  def webpack_asset_url(name)
    if Rails.env.production?
      "/assets/#{webpack_fingerprint_for(name)}"
    else
      "http://localhost:8080/#{name}"
    end
  end

  def webpack_fingerprint_for(name)
    @chunk_manifest ||= JSON.parse(File.read('public/assets/manifest.json'))
    if @chunk_manifest[name].nil?
      logger.error "chunk_manifest_missing name=#{name} version=#{debug_ecs_image_name}"
      logger.error @chunk_manifest.inspect
    end
    @chunk_manifest[name]
  end
end
