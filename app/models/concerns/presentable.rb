module Presentable
  def presenter
    @presenter ||= "#{self.class}Presenter".constantize.new(self)
  end
end
