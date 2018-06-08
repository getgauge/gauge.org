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

end