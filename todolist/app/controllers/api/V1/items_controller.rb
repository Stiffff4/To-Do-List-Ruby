module Api
    module V1
        #require 'IItems'
        class ItemsController < ApplicationController

            #[HTTPGET]
            #Obtiene todos los datos cuyo estatus de trash = 0, o sea, que no esten borrados.
            def index
                items = Item.where(trash: "0")
                return render json: {data:items}, status: :ok
            end

            #[HTTPPOST]
            #Aqui solamente recibe el item. Done y trash por defecto seran inicializados en 0.
            def create
                item = Item.new(item_params)
                item.done = "0"
                item.trash = "0"

                if item.save
                    render json: {data:item}, status: :created
                else
                    render json: {data:item}, status: :unprocessable_entity
                end
            end

            #[HTTPPUT]
            #Cambia el estatus de done a 1, que significa que la tarea ha sido completada.
            def update
                item = Item.find(params[:id])
                if item.update_column(:done, "1")
                    render json: {data:item}, status: :ok
                else
                    render json: {data:item}, status: :unprocessable_entity
                end
            end

            #[HTTPDELETE]
            #No lo borra como tal de la base de datos, solo cambia el estado "trash" a 1, que significa borrado.
            def destroy
                item = Item.find(params[:id])
                if item.update_column(:trash, "1")
                    render json: {data:item}, status: :ok
                else
                    render json: {data:item}, status: :unprocessable_entity
                end
            end

            private
            def item_params
                params.permit(:item)
            end
        end
    end
end