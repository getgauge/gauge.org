# Activate and configure extensions
# https://middlemanapp.com/advanced/configuration/#configuring-extensions
deploy_environment = (ENV['DEPLOY_ENVIRONMENT'] || 'preview')
set :deploy_environment, deploy_environment

activate :autoprefixer do |prefix|
  prefix.browsers = "last 2 versions"
end

# Layouts
# https://middlemanapp.com/basics/layouts/

# Per-page layout changes
page '/*.xml', layout: false
page '/*.json', layout: false
page '/*.txt', layout: false
set :base_url, ENV['BASE_URL'] || 'http://localhost:4567'
set :docs_version, ENV['DOCS_VERSION'] || 'latest'
set :preview?, ENV['DOCS_VERSION'] == 'master'
set :base_url_for_blog_posts, "https://www.gauge.org/"
set :js_dir, "assets/javascripts"
set :css_dir, "assets/stylesheets"
set :images_dir, "assets/images"

configure :development do
  # Reload the browser automatically whenever files change
  activate :livereload
end

# With alternative layout
# page '/path/to/file.html', layout: 'other_layout'

# Proxy pages
# https://middlemanapp.com/advanced/dynamic-pages/

# proxy(
#   '/this-page-has-no-template.html',
#   '/template-file.html',
#   locals: {
#     which_fake_page: 'Rendering a fake page with a local variable'
#   },
# )

# Helpers
# Methods defined in the helpers block are available in templates
# https://middlemanapp.com/basics/helper-methods/

# helpers do
#   def some_helper
#     'Helping'
#   end
# end

# Build-specific configuration
# https://middlemanapp.com/advanced/configuration/#environment-specific-settings

# configure :build do
#   activate :minify_css
#   activate :minify_javascript
# end
activate :blog do |blog|
  blog.sources           = "posts/{year}-{month}-{day}-{title}.html"
  blog.layout            = "post"
  blog.tag_template      = "posts/tag.html"
  blog.calendar_template = "posts/calendar.html"
  blog.paginate          = true
  Time.zone = "Kolkata"
end
activate :directory_indexes


page "/feed.xml", layout: false
page "/sitemap.xml", layout: false
page "/robots.txt", layout: false

helpers do
  def page_name
    if current_page.url == '/'
      return "home"
    else
      return current_page.url.split('/')[1]
    end
  end

  def should_show_drafts?
    not config.deploy_environment.eql?("live")
  end

  def is_draft?(article)
    article.data["draft"] == true
  end

  def selected_articles_for_display_in(articles)
    articles.reject do |article| !should_show_drafts? && is_draft?(article) end
  end

  def canonical_link_for(page_or_article)
    overridden_canonical_url = page_or_article.data[:overridden_canonical_url]

    return overridden_canonical_url unless overridden_canonical_url.nil?
    "#{config.base_url}/#{page_or_article.destination_path.sub(%r{/index.html}, '')}"
  end

  def value_or_default key, default_value = nil
    (current_article.data[key] unless current_article.nil?) || (current_page.data[key] unless current_page.nil?) || default_value
  end

  def value_or_title_as_default property
    default_title = (current_article.title unless current_article.nil?) || (current_page.data.title unless current_page.nil?) || "Open Source Test Automation Framework | Gauge"
    value_or_default(property, default_title)
  end

  def twitter_card_property twitter_specific_property, fallback_property
    value_or_default(twitter_specific_property, value_or_default(fallback_property, ""))
  end

  def twitter_card_image(image)
    path_to_image = value_or_default(:twitter_card_image, value_or_default(:summary_image, image))
    full_path_of_image = if build?
      File.join(app.config[:build_dir], asset_path(:images, path_to_image, :relative => false))
    else
      File.join(app.config[:source], asset_path(:images, path_to_image, :relative => false))
    end
    raise "Image does not exist or too large to use for Twitter summary: #{full_path_of_image}" unless (File.exists?(full_path_of_image) && (File.size(full_path_of_image) < (1024 * 1024 * 1024)))
    URI::join(config.base_url, asset_path(:images, path_to_image, :relative => false))
  end
end