module Presentable
  def presenter
    "#{self.class}Presenter".constantize.new(self)
  end
end
