class InfiniteScrollService
  def initialize(
    items_per_first_page: 20,
    items_per_next_page: 10,
    trigger_shift: -1,
    cursor_column: :id,
    order: :asc  # could be :asc or :desc
  )
    @items_per_first_page = items_per_first_page
    @items_per_next_page = items_per_next_page
    @trigger_shift = trigger_shift
    @cursor_column = cursor_column
    @order = order.downcase
    @compare_sign = @order == :desc ? '<' : '>'
  end

  def page_from(scope, cursor = nil)
    if cursor
      scope = scope.where("#{@cursor_column} #{@compare_sign} ?", cursor)
      amount = @items_per_next_page
    else
      amount = @items_per_first_page
    end

    items = scope.order(@cursor_column => @order).take(amount)
    next_cursor = items.count == amount ? items.last[@cursor_column] : nil
    loading_trigger_id = next_cursor ? items[@trigger_shift].id : nil
    [items, next_cursor, loading_trigger_id]
  end
end
